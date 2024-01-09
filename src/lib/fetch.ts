export const fetchFunc = (url = "", options: RequestInit | undefined) =>
  fetch(url, { ...options })
    .then((data) => {
      return data?.json();
    })
    .then(({ data }) => {
      return data;
    });
