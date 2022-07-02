import React, { useState } from "react";
import user from "../../APIs/user";
import cats from "../../APIs/cats";
import countries from "../../APIs/countries";
import { CatCard } from "../CatCard";

function Generator() {
  const [data, setData] = useState([]);
  const [single, setSingle] = useState(true);
  const [custom, setCustom] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  let catsList = [];
  let searchedCats = [];
  let cNames = countries.getCountries;
  let cCodes = countries.getCodes;

  function changeType() {
    let buttonD = document.getElementById("btnd");
    let buttonV = document.getElementById("btnv");
    let input = document.getElementById("catCount");
    let input2 = document.getElementById("searcher");
    let cat = document.getElementById("catSpan");
    let cats = document.getElementById("catsSpan");
    buttonD.classList.toggle("hidden");
    buttonV.classList.toggle("hidden");
    input.classList.toggle("hidden");
    input2.classList.toggle("hidden");
    cat.classList.toggle("hidden");
    cats.classList.toggle("hidden");
  }
  function changeTypeCustom() {
    let buttonD = document.getElementById("btng");
    let buttonV = document.getElementById("btnv");
    let input = document.getElementById("catCount");
    let input2 = document.getElementById("searcher");
    let input3 = document.getElementById("customName");
    let input4 = document.getElementById("customCountry");
    let cat = document.getElementById("customSpan");
    let cats = document.getElementById("catsSpan");
    buttonD.classList.toggle("hidden");
    buttonV.classList.toggle("hidden");
    input.classList.toggle("hidden");
    input2.classList.toggle("hidden");
    input3.classList.toggle("hidden");
    input4.classList.toggle("hidden");
    cat.classList.toggle("hidden");
    cats.classList.toggle("hidden");
  }

  const getRandomCat = async (a) => {
    let country = countries.getCountry();
    let name = await user.getRandomUserNames();
    let img = await cats.getRandomCat();
    setData([
      {
        name: name.data.results[0].name.first,
        country: country,
        img: img.data[0].url
      }
    ]);
    if (a) {
      return {
        name: name.data.results[0].name.first,
        country: country,
        img: img.data[0].url
      };
    }
  };

  const getRandomCats = async () => {
    catsList = [];
    let input = document.getElementById("catCount");
    let times = 0;
    if (input.value > 1 && input.value < 51) {
      times = input.value;
    } else if (input.value > 50) {
      times = 50;
    }
    for (let i = 0; i < times; i++) {
      let temp = await getRandomCat("a").then((r) => {
        catsList.push(r);
      });
    }
    setData(catsList);
  };
  if (!searchValue.length >= 1) {
    searchedCats = data;
  } else {
    searchedCats = data.filter((cat) => {
      const catName = cat.name.toLowerCase();
      const catCountry = cat.country.name.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return catName.includes(searchText) || catCountry.includes(searchText);
    });
  }

  const onSearchValueChanged = (event) => {
    setSearchValue(event.target.value);
  };

  const getCustomForm = () => {
    let buttonD = document.getElementById("btnd");
    let buttonV = document.getElementById("btng");
    let input = document.getElementById("customName");
    let input2 = document.getElementById("customCountry");
    let cat = document.getElementById("catSpan");
    let cats = document.getElementById("customSpan");
    buttonD.classList.toggle("hidden");
    buttonV.classList.toggle("hidden");
    input.classList.toggle("hidden");
    input2.classList.toggle("hidden");
    cat.classList.toggle("hidden");
    cats.classList.toggle("hidden");
  };

  const getCustomCat = async () => {
    let img = await cats.getRandomCat();
    let select = document.getElementById("customCountry");
    let code = cCodes[select.value];
    let country = [
      "https://flagsapi.com/" + code.toUpperCase() + "/shiny/64.png",
      cNames[select.value]
    ];
    let input = document.getElementById("customName");
    let name = input.value;

    setData([
      {
        name: name,
        country: country,
        img: img.data[0].url
      }
    ]);
  };

  return (
    <React.Fragment>
      <div id="btnd">
        <button id="btno" onClick={getRandomCat}>
          Get a random CAT!
        </button>
        <button id="btnc" onClick={getCustomForm}>
          Get a custom CAT!
        </button>
      </div>

      <input
        id="catCount"
        className={`${single && "hidden"}`}
        placeholder="Max 50"
        type="number"
      ></input>
      <input id="customName" className="hidden" placeholder="Name"></input>
      <select id="customCountry" className="hidden" placeholder="Country">
        {cNames.map((item, index) => {
          return (
            <option key={index} value={index}>
              {item}
            </option>
          );
        })}
      </select>
      <button id="btng" className="hidden" onClick={getCustomCat}>
        Get a custom CAT!
      </button>
      <button id="btnv" className="hidden" onClick={getRandomCats}>
        Get randoms CATS!
      </button>
      <span id="catSpan" onClick={changeType}>
        Or maybe cats?
      </span>
      <span id="customSpan" className="hidden" onClick={changeTypeCustom}>
        Or maybe cats?
      </span>
      <span
        id="catsSpan"
        className={`${single && "hidden"}`}
        onClick={changeType}
      >
        Or maybe one?
      </span>
      <input
        id="searcher"
        className={`${single && data.length < 1 && "hidden"}`}
        placeholder="Search for country or name"
        value={searchValue}
        onChange={onSearchValueChanged}
      />

      <div className="grid">
        {searchedCats.map((item, index) => {
          return <CatCard cat={item} />;
        })}
      </div>
    </React.Fragment>
  );
}

export { Generator };
