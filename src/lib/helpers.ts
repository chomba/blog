export const ownFetch = (input: any, init?: any): Promise<Response> => {
  return fetch(input, {
    ...init,
    cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache"
  });
};