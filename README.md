# celeb-crawler-api-express
api

# Starting Server
```bash
npm start
```

# Response API

```typescript
type APIResponsse = {
  status: number;
  result: {
    thumbnail: string,
    name: string,
    job: string[],
    birthdate: string
  }[] | null
}
```