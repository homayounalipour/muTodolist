export const fields = [
  { id: "1", name: "name", label: "Enter Name", type: "text" },
  { id: "2", name: "age", label: "Enter Age", type: "number" },
  // { name: "country", label: "Enter Country", type: "text" },
];

export const autoCompleteFields = [
  {
    id: "3",
    name: "favoriteGenres",
    label: "Favorite Genres",
    options: [
      { value: "action", title: "Action" },
      { value: "comedy", title: "Comedy" },
      { value: "drama", title: "Drama" },
      { value: "horror", title: "Horror" },
    ],
  },
  {
    id: "4",
    name: "country",
    label: "Select Country",
    options: [
      { value: "iran", title: "Iran" },
      { value: "canada", title: "Canada" },
      { value: "america", title: "America" },
      { value: "uk", title: "United Kingdom" },
    ],
  },
];
