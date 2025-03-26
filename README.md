## Development

Run the Vite dev server:

```sh
npm run dev
```

# Project Considerations

## Product Card Component

Instead of creating a single Product Card component with an extended version, the implementation was split into separate components. This decision was made to maintain separation of concerns, making future feature implementation more manageable.

## API Handling

The API endpoints for fetching categories and retrieving all products are fundamentally different:

The category API does not include pagination, as pagination is handled on the frontend.

The getAll products API requires a different approach due to its structure and pagination logic.

Handling both required managing two distinct situations rather than applying a single filtering approach, which would have been an incorrect yet simpler solution.

## Caching Strategy

Caching was implemented to optimize performance and reduce redundant API calls. By storing frequently accessed data, the system minimizes unnecessary requests, leading to faster response times and a better user experience.

## Filtering Approach

A naïve approach would have been to manipulate the entire product list by applying filters on the frontend. However, the implemented solution ensures better performance and scalability by addressing filtering at the appropriate level within the API design.
