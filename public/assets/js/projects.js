const spaceId = '65fnxbl95zo8'
const accessToken = 'tp4_2D-3VEm5POrLw7FjD3DLFxASS3RduMrVjqZ-7wQ'

const fetchProjects = async () => {
    const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&content_type=projects`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        
        // Logging the fetched project entries
        console.log(data.items);
        
        // Handle and display the project entries
        data.items.forEach(item => {
            console.log(`Title: ${item.fields.title}`);
            console.log(`Description: ${item.fields.description}`);
            // You can map other fields from the 'Projects' content type here
        });
    } catch (error) {
        console.error('Failed to fetch projects:', error);
    }
};

fetchProjects();
