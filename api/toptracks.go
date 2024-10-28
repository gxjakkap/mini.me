package handler

import (
	b64 "encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

type getAccessTokenForTTResponse struct {
	AccessToken string `json:"access_token"`
	TokenType   string `json:"token_type"`
	ExpireIn    int    `json:"expires_in"`
	Scope       string `json:"scope"`
}

type getAccessTokenForTTErrorResponse struct {
	Error string `json:"error"`
}

type getAccessTokenForTTResult struct {
	Success bool
	Token   string
	Error   string
}

type topTracksData struct {
	Href     string      `json:"href"`
	Limit    int         `json:"limit"`
	Next     string      `json:"next"`
	Offset   int         `json:"offset"`
	Previous interface{} `json:"previous"`
	Total    int         `json:"total"`
	Items    []struct {
		Album struct {
			AlbumType        string   `json:"album_type"`
			TotalTracks      int      `json:"total_tracks"`
			AvailableMarkets []string `json:"available_markets"`
			ExternalUrls     struct {
				Spotify string `json:"spotify"`
			} `json:"external_urls"`
			Href   string `json:"href"`
			ID     string `json:"id"`
			Images []struct {
				URL    string `json:"url"`
				Height int    `json:"height"`
				Width  int    `json:"width"`
			} `json:"images"`
			Name                 string `json:"name"`
			ReleaseDate          string `json:"release_date"`
			ReleaseDatePrecision string `json:"release_date_precision"`
			Type                 string `json:"type"`
			URI                  string `json:"uri"`
			Artists              []struct {
				ExternalUrls struct {
					Spotify string `json:"spotify"`
				} `json:"external_urls"`
				Href string `json:"href"`
				ID   string `json:"id"`
				Name string `json:"name"`
				Type string `json:"type"`
				URI  string `json:"uri"`
			} `json:"artists"`
		} `json:"album"`
		Artists []struct {
			ExternalUrls struct {
				Spotify string `json:"spotify"`
			} `json:"external_urls"`
			Href string `json:"href"`
			ID   string `json:"id"`
			Name string `json:"name"`
			Type string `json:"type"`
			URI  string `json:"uri"`
		} `json:"artists"`
		AvailableMarkets []string `json:"available_markets"`
		DiscNumber       int      `json:"disc_number"`
		DurationMs       int      `json:"duration_ms"`
		Explicit         bool     `json:"explicit"`
		ExternalIds      struct {
			Isrc string `json:"isrc"`
		} `json:"external_ids"`
		ExternalUrls struct {
			Spotify string `json:"spotify"`
		} `json:"external_urls"`
		Href        string `json:"href"`
		ID          string `json:"id"`
		Name        string `json:"name"`
		Popularity  int    `json:"popularity"`
		PreviewURL  string `json:"preview_url"`
		TrackNumber int    `json:"track_number"`
		Type        string `json:"type"`
		URI         string `json:"uri"`
		IsLocal     bool   `json:"is_local"`
	} `json:"items"`
}

type topTracksError struct {
	Error struct {
		Status  int    `json:"status"`
		Message string `json:"message"`
	} `json:"error"`
}

type topTracksResponse struct {
	Status int
	Data   topTracksData
	Error  string
}

type ttSong struct {
	Artist    string `json:"artist"`
	Name      string `json:"name"`
	Uri       string `json:"uri"`
	Link      string `json:"link"`
	Album     string `json:"album"`
	ImageLink string `json:"image_link"`
}

type spotifyQueryForTTResult struct {
	Items []ttSong `json:"items"`
}

type spotifyQueryForTTError struct {
	Error string
}

func getAccessTokenForTT(endpoint string, body io.Reader, basic string) getAccessTokenForTTResult {
	client := http.Client{}
	req, err := http.NewRequest(http.MethodPost, endpoint, body)

	if err != nil {
		return getAccessTokenForTTResult{false, "", "NewRequest Error"}
	}

	req.Header.Set("Authorization", fmt.Sprintf("Basic %s", basic))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	res, err := client.Do(req)

	if err != nil {
		return getAccessTokenForTTResult{false, "", "API Call Error"}
	}

	if res.StatusCode != http.StatusOK {
		return getAccessTokenForTTResult{false, "", fmt.Sprintf("API Call Error: [%d]", res.StatusCode)}
	}

	defer res.Body.Close()

	resData, err := io.ReadAll(res.Body)
	if err != nil {
		return getAccessTokenForTTResult{false, "", "ioReadAll Error"}
	}

	var APIResponse getAccessTokenForTTResponse
	var APIError getAccessTokenForTTErrorResponse

	if err := json.Unmarshal(resData, &APIResponse); err != nil {
		if err := json.Unmarshal(resData, &APIError); err != nil {
			return getAccessTokenForTTResult{false, "", "JSON Parsing Error"}
		}
		return getAccessTokenForTTResult{false, "", "API Error"}
	}

	return getAccessTokenForTTResult{true, APIResponse.AccessToken, ""}
}

func getTopTracks(endpoint string, bearer string) topTracksResponse {

	timeRange := "short_term"
	limit := 15
	offSet := 0

	u, err := url.Parse(endpoint)

	if err != nil {
		log.Fatal(err)
	}

	q := u.Query()
	q.Set("time_range", timeRange)
	q.Set("limit", fmt.Sprint(limit))
	q.Set("offset", fmt.Sprint(offSet))

	u.RawQuery = q.Encode()

	client := http.Client{}
	req, err := http.NewRequest(http.MethodGet, fmt.Sprint(u), nil)

	if err != nil {
		return topTracksResponse{418, topTracksData{}, "NewRequest Error"}
	}

	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", bearer))

	res, err := client.Do(req)

	if err != nil {
		return topTracksResponse{418, topTracksData{}, "API Call Error"}
	}

	if res.StatusCode == http.StatusNoContent {
		return topTracksResponse{204, topTracksData{}, "No Content - User's currently not listening to anything"}
	}

	defer res.Body.Close()

	resData, err := io.ReadAll(res.Body)

	if err != nil {
		return topTracksResponse{418, topTracksData{}, "ioReadAll Error"}
	}

	fmt.Println(res.StatusCode)
	fmt.Println(req)

	var npRes topTracksData
	var npErr topTracksError

	if err := json.Unmarshal(resData, &npRes); err != nil {
		if err := json.Unmarshal(resData, &npErr); err != nil {
			fmt.Println(err.Error())
			return topTracksResponse{418, topTracksData{}, "JSON Parsing Error"}
		}
		return topTracksResponse{npErr.Error.Status, topTracksData{}, npErr.Error.Message}
	}
	return topTracksResponse{res.StatusCode, npRes, ""}
}

func spotifyQueryForTT() (spotifyQueryForTTResult, spotifyQueryForTTError) {
	godotenv.Load()
	clientId := os.Getenv("SPOTIFY_CLIENT_ID")
	clientSecret := os.Getenv("SPOTIFY_CLIENT_SECRET")
	refreshToken := os.Getenv("SPOTIFY_REFRESH_TOKEN")

	basicData := fmt.Sprintf("%s:%s", clientId, clientSecret)

	basic := b64.StdEncoding.EncodeToString([]byte(basicData))

	TOP_TRACKS_ENDPOINT := "https://api.spotify.com/v1/me/top/tracks"
	TOKEN_ENDPOINT := "https://accounts.spotify.com/api/token"

	tokenQueryData := url.Values{}
	tokenQueryData.Set("grant_type", "refresh_token")
	tokenQueryData.Set("refresh_token", refreshToken)

	accessTokenResponse := getAccessTokenForTT(TOKEN_ENDPOINT, strings.NewReader(tokenQueryData.Encode()), basic)

	if accessTokenResponse.Error != "" {
		return spotifyQueryForTTResult{}, spotifyQueryForTTError{fmt.Sprintf("Access token fetching error: %s", accessTokenResponse.Error)}
	}

	if !accessTokenResponse.Success {
		return spotifyQueryForTTResult{}, spotifyQueryForTTError{"Access token fetching error"}
	}

	topTracksResult := getTopTracks(TOP_TRACKS_ENDPOINT, accessTokenResponse.Token)

	if topTracksResult.Status != http.StatusOK {
		return spotifyQueryForTTResult{}, spotifyQueryForTTError{fmt.Sprintf("Error while fetching from spotify api: [%d] %s", topTracksResult.Status, topTracksResult.Error)}
	}

	data := topTracksResult.Data

	var items []ttSong

	for _, x := range data.Items {
		var artistName string

		for _, a := range x.Artists {
			if artistName != "" {
				artistName += ", "
			}
			artistName += a.Name
		}

		maxSizeImg := x.Album.Images[0]
		for _, im := range x.Album.Images {
			if im.Width > maxSizeImg.Width {
				maxSizeImg = im
			}
		}

		items = append(items, ttSong{artistName, x.Name, x.URI, x.ExternalUrls.Spotify, x.Album.Name, maxSizeImg.URL})
	}

	return spotifyQueryForTTResult{items}, spotifyQueryForTTError{}
}

func TopTracks(w http.ResponseWriter, r *http.Request) {
	res, err := spotifyQueryForTT()

	if err.Error != "" {
		http.Error(w, fmt.Sprintf("Internal Server Error: %s", err.Error), http.StatusInternalServerError)
		return
	}

	fResVal := &spotifyQueryForTTResult{
		Items: res.Items,
	}

	fRes, _ := json.Marshal(fResVal)

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Referrer-Policy", "no-referrer")
	w.WriteHeader(http.StatusOK)
	if _, err := fmt.Fprintf(w, string(fRes)); err != nil {
		http.Error(w, fmt.Sprintf("Internal Server Error: %s", err.Error()), http.StatusInternalServerError)
		return
	}
}
