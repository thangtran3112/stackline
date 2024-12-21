# Product Sale Reports

## Deployment

- AWS Cloudfront with s3. [Website](https://d1wxekv8awuwou.cloudfront.net)

## Techstacks

- Material UI, Redux Toolkit, Tanstack React Query, Recharts

## Alternatives

- This could also be built using `tailwind` with headless ui libraries such as `ShadCnUI` instead of Material UI for better customizations.
- The reason for using Material UI, is due to using Material UI DataGrid
- Instead of `@tanstack/react-query` we can also use RTK query or useSWR. @tanstack/react-query has more features and integrations, such as with [trpc](https://trpc.io/), and separate state management from api managements.

## Notes

- Could add Unit tests, but over the scope of this little exercise
