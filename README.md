## Configuration

```sh
pnpm install
```

## Development

```sh
pnpm run dev
```

# Project Considerations

## Product Card Component

Instead of creating a single Product Card component with an extended version, the implementation was split into separate components. This decision was made to maintain separation of concerns, making future feature implementation more manageable.

## API Handling

The API endpoints for fetching categories and retrieving all products are fundamentally different:

The category API does not include pagination, as pagination is handled on the frontend. Also no more than one category is allowed, having to make multiple requests and then merging the results together and after that checking for sorting and applying in the FE.

The getAll products API requires a different approach due to its structure and pagination logic.

Handling both required managing two distinct situations rather than applying a single filtering approach, which would have been an incorrect yet simpler solution.

In case of the getAll could have used a selector to do request only the necessary fields instead of everything, but the Category API doesnt have that implementation. That lead me to the decision to make another call when visiting the single product page to make a call by ID to retrieve all information form the product, simulating a real application. In that case would fetch only necessary data to avoid performance issues in long lists.

## Filtering Approach

A naïve approach would have been to manipulate the entire product list by applying filters on the frontend. However, the implemented solution ensures better performance and scalability by addressing filtering at the appropriate level within the API design.

## Promo Code Feature

A promo code functionality has been added to the cart page. User can check the current promo codes by clicking on the Checkout button, which will log the entire cart content to the console. This allows for verification of all items in the cart including their sku (promocodes).
