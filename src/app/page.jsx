import FeaturedCategories from "../components/section_components/FeaturedCategories";
import Featured from "@/components/section_components/Featured";
import Header from "@/components/section_components/Header";
import PageDescription from "@/components/section_components/PageDescription";
import Notification from "@/components/section_components/Notification";
import MainCategories from "@/components/section_components/MainCategories";

const getCategories = async () => {
  const res = await fetch("http://localhost:3000/api/categories");

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
};

const getFeaturedCategories = async () => {
  const res = await fetch("http://localhost:3000/api/sub_categories");

  if (!res.ok) {
    throw new Error("Failed to fetch featured sub_categories");
  }

  return res.json();
};

const getFeaturedProducts = async () => {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch featured products");
  }

  return res.json();
};

export default async function Home() {
  const main_categories = await getCategories();
  const featured_sub_categories = await getFeaturedCategories();
  const featuredProducts = await getFeaturedProducts();
  return (
    <main>
      <Notification />
      <Header
        details={{
          title: "NEW STUFF JUST DROPPED",
          description:
            "We all know you’re gonna be wearing these next time you go gym. Might as well grab them now.",
          smsrc: "/bannerbottom.jpg",
          mdsrc: "/banner.jpg",
          buttons: [
            {
              text: "Shop Men",
              ref: "/collections/men",
            },
            {
              text: "Shop Women",
              ref: "/collections/women",
            },
          ],
        }}
      />

      <div>
        <Featured
          products={featuredProducts.products}
          subtitle={"Everybody's Favorite"}
          title={"GYMSHARK SEASON"}
        />
      </div>

      <FeaturedCategories
        categories={featured_sub_categories}
        title={"How do you train?"}
      />

      <Header
        details={{
          title: "GYMSHARK MERCH",
          description:
            "For locking in. For life. For the love of the game. For levelling up. Go get it before it’s gone.",
          smsrc: "/banner.jpg",
          mdsrc: "/banner2.jpg",
          buttons: [
            {
              text: "Shop Now",
              ref: "/collections/men",
            },
          ],
        }}
      />

      <MainCategories categories={main_categories} />

      <PageDescription />
    </main>
  );
}
