import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import HeroImg from "@/assets/foogimg.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [serachText, setSearchText] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items- justify-center m-4 gap-20">
      <div className="flex flex-col gap-10 md:w-[40%]">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl ">
            Order food anytime & anywhwere
          </h1>
          <p>Are you hungry! delicious food is waiting for you</p>
        </div>
        <div className="relative flex items-center gap-2">
          <Input
            type="text"
            value={serachText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-10 shadow-lg"
            placeholder="Search restaurant by name, city & country"
          />
          <Search className="text-gray-500 absolute inset-y-2 left-2" />
          <Button
            className="bg-orange hover:bg-hoverGreen"
            onClick={() => navigate(`/search/${serachText}`)}
          >
            Search
          </Button>
        </div>
      </div>
      <div>
        <img
          src={HeroImg}
          alt=""
          className="object-cover w-full max-h[500px]"
        />
      </div>
    </div>
  );
};

export default HeroSection;
