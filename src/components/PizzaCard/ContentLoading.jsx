import React from "react";
import ContentLoader from "react-content-loader";

const ContentLoading = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="2" y="293" rx="11" ry="11" width="265" height="62" />
    <rect x="13" y="19" rx="100" ry="100" width="230" height="230" />
    <rect x="127" y="382" rx="10" ry="10" width="140" height="40" />
    <rect x="-4" y="375" rx="8" ry="8" width="102" height="36" />
    <rect x="10" y="259" rx="6" ry="6" width="247" height="21" />
  </ContentLoader>
);

export default ContentLoading;
