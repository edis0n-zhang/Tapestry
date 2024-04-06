import Header from "../components/Header";
import ArticleListings from "../components/ArticleListings";
import { DatePicker } from "../components/DatePicker";

export default function Home() {
  interface Article {
    id: number;
    title: string;
    description: string;
    image: string;
  }

  const articleListings: Article[] = [
    {
      id: 1,
      title:
        "2 men convicted of killing Run-DMC\u2019s Jam Master Jay, nearly 22 years after rap star's death",
      description:
        "NEW YORK (AP) \u2014 Two men were convicted of murder Tuesday in the death of Run-DMC star Jam Master Jay, a brazen 2002 shooting in the rap legend\u2019s studio.",
      image: "/chatgpt.jpg",
    },
    {
      id: 2,
      title:
        "Chatbots' inaccurate, misleading responses about U.S. elections threaten to keep voters from polls",
      description:
        "NEW YORK (AP) \u2014 With presidential primaries underway across the U.S., popular chatbots are generating false and misleading information that threatens to disenfranchise voters, according to a report published Tuesday based on the findings of artificial intelli\u2026",
      image: "/chatgpt.jpg",
    },
    {
      id: 3,
      title:
        "The killing of a Georgia nursing student is now at the center of the US immigration debate",
      description:
        "ATHENS, Ga. (AP) \u2014 Laken Riley was a 22-year-old nursing student out on her morning run at the University of Georgia when authorities say a stranger dragged her into a secluded area and killed her, sending shockwaves through campus as police searched for a su\u2026",
      image: "/chatgpt.jpg",
    },
    {
      id: 4,
      title:
        "A deal between Israel and Hamas appears to be taking shape. What would it look like?",
      description:
        "CAIRO (AP) \u2014 Israel and Hamas are inching toward a new deal that would free some of the roughly 130 hostages held in the Gaza Strip in exchange for a weekslong pause in the war, now in its fifth month.",
      image: "/chatgpt.jpg",
    },
    {
      id: 5,
      title:
        "20 years since NHL's record-setting brawl, fighting is down across the league but not going anywhere",
      description:
        "Minnesota's Marcus Foligno took a hit, delivered one of his own to Chicago's Jarred Tinordi, and the two big guys dropped the gloves. Outdoors in front of 82,000 people in the Meadowlands, it took even less for Matt Rempe and Matt Martin to spice up the Range\u2026",
      image: "/chatgpt.jpg",
    },
  ];

  return (
    <div className="min-h-screen dark:bg-black">
      <Header />
      <div className="mt-5 flex h-full flex-col px-10 md:px-48">
        <div className="mt-2">
          <DatePicker />
        </div>
        <div className="mt-5 flex-grow">
          <ArticleListings Articles={articleListings} />
        </div>
      </div>
    </div>
  );
}
