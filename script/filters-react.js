// COMPONENTS
// ----------
// Main
//   UI
//     ButtonCategory
//     Result
//       DisplayResult

const DisplayResult = ({ category, name }) => (
  <div className="box category boxWidth boxHeight spread">
    {name}
    <div className={"  category-" + category + " circle "}>
      {/*category*/}
    </div>
  </div>
);

const Result = ({ state }) => (
  <div className="">
    {state.products
      .filter(
        product =>
          product.category === state.displayCategory ||
          state.displayCategory === "all"
      )
      .map(product => (
        <DisplayResult category={product.category} name={product.name} />
      ))}
  </div>
);

const ButtonCategory = ({ setCategory, category }) => (
  <button
    className={"boxHeight boxWidth btn-" + category}
    onClick={() => setCategory(category)}
  >
    {category}
  </button>
);

const UI = ({ setCategory, state, allProducts }) => (
  <div className="box flex-row">
    <div className="box flex-col">
      <h3>Filter by Category</h3>
      {state.productCategories.map(category => (
        <ButtonCategory setCategory={setCategory} category={category} />
      ))}
    </div>
    <div className="box flex-col">
      <h3>Results</h3>
      <Result state={state} />
    </div>
  </div>
);

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCategory: "all",
      products: PRODUCTS,
      productCategories: PRODUCT_CATEGORIES
    };
  }
  setCategory(category) {
    this.setState({
      displayCategory: category
    });
  }
  render() {
    return <UI setCategory={this.setCategory.bind(this)} state={this.state} />;
  }
}

const PRODUCTS = [
  { category: "entertainment", name: "Football" },
  { category: "entertainment", name: "Baseball" },
  { category: "entertainment", name: "Basketball" },
  { category: "fashion", name: "iPod Touch" },
  { category: "design", name: "iPhone 5" },
  { category: "design", name: "Nexus 7" },
  { category: "leisure", name: "Holiday" }
];

// get unique categories
const PRODUCT_CATEGORIES = PRODUCTS.map(product => product.category)
  .sort()
  .filter((item, i, arr) => arr[i] != arr[i - 1]);
//unique = a.filter((x, i, a) => a.indexOf(x) == i)
PRODUCT_CATEGORIES.push("all");

console.log(PRODUCT_CATEGORIES);

ReactDOM.render(<Main products={PRODUCTS} />, document.getElementById("root"));
