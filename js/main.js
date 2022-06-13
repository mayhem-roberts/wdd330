function weekList() {
  const links = [
    {
      label: "- Week01",
      url: "week01/index.html"
    },
    {
      label: "- Week02",
      url: "week02/index.html"
    },
    {
      label: "- Week03",
      url: "week03/index.html"
    },
    {
      label: "- Week04",
      url: "week04/index.html"
    },
    {
      label: "- Week05",
      url: "week05/index.html"
    },
    {
      label: "- Week06",
      url: "week06/index.html"
    },
    {
      label: "- Week07",
      url: "week07/index.html"
    },
    {
      label: "- Week08",
      url: "week08/index.html"
    },
    {
      label: "- Week09",
      url: "week09/index.html"
    }
  ]

  links.forEach(w => {
    let li = document.createElement("li");
    let a = document.createElement("a");

    let label = document.createTextNode(w.label);
    console.log

    a.appendChild(label);
    a.setAttribute("href", w.url);

    li.appendChild(a);

    let list = document.getElementById("list");
    list.appendChild(li);
  })
}

// call function
weekList();


