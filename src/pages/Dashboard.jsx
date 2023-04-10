import React, { useState, useEffect } from "react";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";

const Dashboard = () => {
  const [wikiData, setWikiData] = useState([]);
  const [search, setSearch] = useState("");
  const fetchData = async (value) => {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&formatversion=2&srsearch=${value}&origin=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Origin: "https://en.wikipedia.org",
        },
      }
    );
    const data = await response.json();

    setWikiData(data.query.search);

    setSearch("");
  };

  useEffect(() => {
    fetchData(search);
  }, [wikiData]);
  console.log(wikiData);

  return (
    <div className="bg-[#FAFAFD] ">
      <h3 className='text-[#01058A] font-bold text-[1.5rem] underline py-[2%]'>Wikipedia Keyword Search Analytics</h3>
      <div className="flex justify-center items-center">
        <input
          type="text"
          className="border-2 border-[#01058A] rounded-md px-[5%] py-[2%] w-[50%] text-[#01058A] text-center"
          value={search}
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-[#01058A] text-[#fff] px-[5%] py-[2%] rounded-md"
          onClick={() => fetchData(search)}
        >
          Search
        </button>
      </div>
      <div className="bg-[#FAFAFD] flex justify-evenly py-[5%]">
        <FinanceCard
          finType={"February"}
          Price={"35%"}
          Compare={"Compared to ( last year)"}
        />
        <FinanceCard
          finType={"March"}
          Price={"50%"}
          Compare={"Compared to (last year)"}
        />
        <FinanceCard
          finType={"April"}
          Price={"62%"}
          Compare={"Compared to ( last year)"}
        />
      </div>

      {wikiData.length === 0 ? <div>Type your preferred keyword in the search bar to see its Wiki WordCount/Search Result</div> :
       <div className="flex flex-col lg:flex-row justify-evenly ">
        <BarChart data={wikiData} />
        <PieChart data={wikiData} />
      </div>}
    </div>
  );
};

export default Dashboard;

const FinanceCard = ({ finType, Price, Compare }) => {
  return (
    <div className="shadow w-[30%] rounded-md bg-[#fff] h-[30vh] flex flex-col justify-center text-left px-[5%]">
      <p className="text-[#33343D]">{finType}</p>
      <h4 className="text-[#01058A] font-bold text-[1.4rem]">{Price}</h4>
      <p className=" text-[#807D9B]">{Compare}</p>
    </div>
  );
};
