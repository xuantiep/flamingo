export function renderCategories(cats) {
  const renderedCategories = [];
  if (cats != undefined && cats != null) {
    for (const i in cats) {
      if (i > 0) {
        renderedCategories.push(<span>, </span>);
      }
      renderedCategories.push(
        <a href={`/category/${cats[i].slug}`}>
          <h2 dangerouslySetInnerHTML={{ __html: cats[i].name }}></h2>
        </a>
      );
    }
  }
  return renderedCategories;
}

export function renderAuthors(authors) {
  let renderedAuthors = [];
  if (authors != undefined && authors != null) {
    if (authors.length === 0) {
      renderedAuthors = <span>Daily Bruin Staff</span>;
    } else {
      for (const i in authors) {
        if (i > 0) {
          renderedAuthors.push(<span>, </span>);
        }
        if (i === authors.length - 1) {
          renderedAuthors.push(<span>and </span>);
        }
        renderedAuthors.push(
          <a href={`/author/${authors[i]["user_nicename"]}`}>
            {authors[i]["display_name"]}
          </a>
        );
      }
    }
  }
  return renderedAuthors;
}
