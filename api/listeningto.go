package handler

import (
	b64 "encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

type getAccessTokenResponse struct {
	AccessToken string `json:"access_token"`
	TokenType   string `json:"token_type"`
	ExpireIn    int    `json:"expires_in"`
	Scope       string `json:"scope"`
}

type getAccessTokenErrorResponse struct {
	Error string `json:"error"`
}

type getAccessTokenResult struct {
	Success bool
	Token   string
	Error   string
}

type spotifyNowPlayingData struct {
	Timestamp  int64       `json:"timestamp"`
	Context    interface{} `json:"context"`
	ProgressMs int         `json:"progress_ms"`
	Item       struct {
		Album struct {
			AlbumType string `json:"album_type"`
			Artists   []struct {
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
			ExternalUrls     struct {
				Spotify string `json:"spotify"`
			} `json:"external_urls"`
			Href   string `json:"href"`
			ID     string `json:"id"`
			Images []struct {
				Height int    `json:"height"`
				URL    string `json:"url"`
				Width  int    `json:"width"`
			} `json:"images"`
			Name                 string `json:"name"`
			ReleaseDate          string `json:"release_date"`
			ReleaseDatePrecision string `json:"release_date_precision"`
			TotalTracks          int    `json:"total_tracks"`
			Type                 string `json:"type"`
			URI                  string `json:"uri"`
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
		IsLocal     bool   `json:"is_local"`
		Name        string `json:"name"`
		Popularity  int    `json:"popularity"`
		PreviewURL  string `json:"preview_url"`
		TrackNumber int    `json:"track_number"`
		Type        string `json:"type"`
		URI         string `json:"uri"`
	} `json:"item"`
	CurrentlyPlayingType string `json:"currently_playing_type"`
	Actions              struct {
		Disallows struct {
			Resuming     bool `json:"resuming"`
			SkippingPrev bool `json:"skipping_prev"`
		} `json:"disallows"`
	} `json:"actions"`
	IsPlaying bool `json:"is_playing"`
}

type spotifyNowPlayingError struct {
	Error struct {
		Status  int    `json:"status"`
		Message string `json:"message"`
	} `json:"error"`
}

type spotifyNowPlayingResponse struct {
	Status int
	Data   spotifyNowPlayingData
	Error  string
}

type spotifyQueryResult struct {
	Album         string `json:"album"`
	AlbumImageUrl string `json:"album_image_url"`
	Artist        string `json:"artist"`
	IsPlaying     bool   `json:"is_playing"`
	SongUrl       string `json:"song_url"`
	Title         string `json:"title"`
}

type spotifyQueryError struct {
	Error string
}

func getAccessToken(endpoint string, body io.Reader, basic string) getAccessTokenResult {
	client := http.Client{}
	req, err := http.NewRequest(http.MethodPost, endpoint, body)

	if err != nil {
		return getAccessTokenResult{false, "", "NewRequest Error"}
	}

	req.Header.Set("Authorization", fmt.Sprintf("Basic %s", basic))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	res, err := client.Do(req)

	if err != nil {
		return getAccessTokenResult{false, "", "API Call Error"}
	}

	if res.StatusCode != http.StatusOK {
		return getAccessTokenResult{false, "", fmt.Sprintf("API Call Error: [%d]", res.StatusCode)}
	}

	defer res.Body.Close()

	resData, err := io.ReadAll(res.Body)
	if err != nil {
		return getAccessTokenResult{false, "", "ioReadAll Error"}
	}

	var APIResponse getAccessTokenResponse
	var APIError getAccessTokenErrorResponse

	if err := json.Unmarshal(resData, &APIResponse); err != nil {
		if err := json.Unmarshal(resData, &APIError); err != nil {
			return getAccessTokenResult{false, "", "JSON Parsing Error"}
		}
		return getAccessTokenResult{false, "", "API Error"}
	}

	return getAccessTokenResult{true, APIResponse.AccessToken, ""}
}

func getNowPlaying(endpoint string, bearer string) spotifyNowPlayingResponse {
	client := http.Client{}
	req, err := http.NewRequest(http.MethodGet, endpoint, nil)

	if err != nil {
		return spotifyNowPlayingResponse{418, spotifyNowPlayingData{}, "NewRequest Error"}
	}

	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", bearer))

	res, err := client.Do(req)

	if err != nil {
		return spotifyNowPlayingResponse{418, spotifyNowPlayingData{}, "API Call Error"}
	}

	if res.StatusCode == http.StatusNoContent {
		return spotifyNowPlayingResponse{204, spotifyNowPlayingData{}, "No Content - User's currently not listening to anything"}
	}

	defer res.Body.Close()

	resData, err := io.ReadAll(res.Body)

	if err != nil {
		return spotifyNowPlayingResponse{418, spotifyNowPlayingData{}, "ioReadAll Error"}
	}

	fmt.Println(res.StatusCode)
	fmt.Println(req)

	var npRes spotifyNowPlayingData
	var npErr spotifyNowPlayingError

	if err := json.Unmarshal(resData, &npRes); err != nil {
		if err := json.Unmarshal(resData, &npErr); err != nil {
			fmt.Println(err.Error())
			return spotifyNowPlayingResponse{418, spotifyNowPlayingData{}, "JSON Parsing Error"}
		}
		return spotifyNowPlayingResponse{npErr.Error.Status, spotifyNowPlayingData{}, npErr.Error.Message}
	}
	return spotifyNowPlayingResponse{res.StatusCode, npRes, ""}
}

func spotifyQuery() (spotifyQueryResult, spotifyQueryError) {
	godotenv.Load()
	clientId := os.Getenv("SPOTIFY_CLIENT_ID")
	clientSecret := os.Getenv("SPOTIFY_CLIENT_SECRET")
	refreshToken := os.Getenv("SPOTIFY_REFRESH_TOKEN")

	basicData := fmt.Sprintf("%s:%s", clientId, clientSecret)

	basic := b64.StdEncoding.EncodeToString([]byte(basicData))

	NOW_PLAYING_ENDPOINT := "https://api.spotify.com/v1/me/player/currently-playing"
	TOKEN_ENDPOINT := "https://accounts.spotify.com/api/token"

	tokenQueryData := url.Values{}
	tokenQueryData.Set("grant_type", "refresh_token")
	tokenQueryData.Set("refresh_token", refreshToken)

	accessTokenResponse := getAccessToken(TOKEN_ENDPOINT, strings.NewReader(tokenQueryData.Encode()), basic)

	if accessTokenResponse.Error != "" {
		return spotifyQueryResult{}, spotifyQueryError{fmt.Sprintf("Access token fetching error: %s", accessTokenResponse.Error)}
	}

	if !accessTokenResponse.Success {
		return spotifyQueryResult{}, spotifyQueryError{"Access token fetching error"}
	}

	nowPlayingResponse := getNowPlaying(NOW_PLAYING_ENDPOINT, accessTokenResponse.Token)

	if nowPlayingResponse.Status == http.StatusNoContent {
		return spotifyQueryResult{"", "", "", false, "", ""}, spotifyQueryError{}
	}

	if nowPlayingResponse.Status != http.StatusOK {
		return spotifyQueryResult{}, spotifyQueryError{fmt.Sprintf("Error while fetching from spotify api: [%d] %s", nowPlayingResponse.Status, nowPlayingResponse.Error)}
	}

	data := nowPlayingResponse.Data

	var artist string

	for _, a := range data.Item.Artists {
		if artist != "" {
			artist += ", "
		}
		artist += a.Name
	}

	return spotifyQueryResult{data.Item.Album.Name, data.Item.Album.Images[0].URL, artist, data.IsPlaying, data.Item.ExternalUrls.Spotify, data.Item.Name}, spotifyQueryError{}
}

func ListeningTo(w http.ResponseWriter, r *http.Request) {
	res, err := spotifyQuery()

	if err.Error != "" {
		http.Error(w, fmt.Sprintf("Internal Server Error: %s", err.Error), http.StatusInternalServerError)
		return
	}

	fResVal := &spotifyQueryResult{
		Album:         res.Album,
		AlbumImageUrl: res.AlbumImageUrl,
		Artist:        res.Artist,
		SongUrl:       res.SongUrl,
		Title:         res.Title,
		IsPlaying:     res.IsPlaying,
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
