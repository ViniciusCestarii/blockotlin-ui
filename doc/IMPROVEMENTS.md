server-side

https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating

- [ ] Bring all fetch to server side and use fetch cache

- [ ] Bring all actions to server side and use server action and revalidate cache

Pros:

- SEO Benefits: Content is fetched on the server, making it readily available to search engines, improving SEO and initial load performance for users.

- Reduced Client Workload: Since most of the heavy lifting is done on the server, client-side JavaScript processing and memory usage are minimized.

- Better for Slow Networks: Since data is processed on the server, the user experience on slower networks can improve as the browser handles less work.

- Centralized Data Fetching: Server-side fetch caching simplifies data management by keeping caching and revalidation logic in one place (server).

- Access to Secure APIs: Server-side data fetching can handle sensitive API calls (e.g., APIs requiring secret keys) without exposing secrets to the client.
- 
Cons:

- Server Load: Puts more strain on your server as all data fetching and actions are handled server-side, increasing resource usage and possibly requiring more expensive infrastructure.

- Latency for Remote Users: Users far from the server might experience higher latency, as data fetching is server-based.

- Complex Cache Management: Managing caching, revalidation, and cache invalidation on the sever.

OR

client-side (the only exception is the middleware on the server)

- [ ] Fetch everyrithing on client side using react-query

- [ ] Based on server action update the client react-query cache

Pros:

- Efficient Network Usage: React Query handles caching and avoids redundant network requests, improving performance when navigating between pages or interacting with the app.

- Reduced Server Load: By moving data fetching to the client, you offload the server, potentially lowering infrastructure costs and making the app more scalable.

- Decentralized Caching Control: Client-side caching can be tuned based on user behavior, and cache updates can be immediate based on interactions.

- Flexibility: Client-side fetching allows for partial data fetching, reducing the need for full-page refreshes and improving perceived performance.

Cons:

Initial Load Performance: Since data is fetched after the page loads, users might experience slower initial rendering (especially on slower networks) and may see loading spinners.

SEO Challenges: Client-side fetching makes it harder to provide SEO-optimized pages, as content is not available to search engines immediately.

Increased Client-Side Processing: More work is shifted to the client, potentially slowing down devices with limited resources (e.g., mobile devices).
