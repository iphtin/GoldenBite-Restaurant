import React, { useState, useEffect } from "react";
import CategoryForm from "../components/CategoryForm";
import { deleteItem, getCategories } from "../services";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  // Example menu items
  // const menuItems = [
  //   {
  //     id: 1,
  //     image:
  //       "https://www.realfoodwithsarah.com/wp-content/uploads/2024/05/authentic-italian-pasta-sauce-3.jpg",
  //     name: "Pasta",
  //     addedOn: "2025-01-01",
  //   },
  //   {
  //     id: 2,
  //     image:
  //       "https://www.kikkoman.eu/fileadmin/user_upload/kikkoman.eu/Food-News/EU_make-your-own-sushi/sushi-kakkoii.jpeg",
  //     name: "Sushi",
  //     addedOn: "2025-01-02",
  //   },
  //   {
  //     id: 3,
  //     image:
  //       "https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg",
  //     name: "Burger",
  //     addedOn: "2025-01-03",
  //   },
  //   {
  //     id: 4,
  //     image:
  //       "https://www.onceuponachef.com/images/2023/08/Beef-Tacos-760x570.jpg",
  //     name: "Tacos",
  //     addedOn: "2025-01-04",
  //   },
  // ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        setCategories(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, [categories]);

  const _filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowForm(true);
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      if (
        window.confirm(
          "Are sure you want to delete Category and associated food items"
        )
      ) {
        await deleteItem("categories/delete", id);
        console.log(id);
        setCategories(categories.filter((c) => c._id !== id));
      }
    } catch (error) {
      console.error("Error deleting category", error);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setShowForm(true);
    setSelectedItem(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin-slow"></div>
      </div>
    );
  }

  return (
    <div className="p-6 w-[95%] relative mx-auto overflow-y-scroll min-h-screen">
      {/* Title */}
      {showForm && (
        <div className="w-[79%] bg-gray-200 fixed flex items-center h-screen top-2 right-0 rounded-md">
          <CategoryForm setShowForm={setShowForm} item={selectedItem} />
        </div>
      )}
      <div className="flex justify-between mb-4 items-center">
        <h1 className="text-xl font-bold flex">
          Category -<p className="text-blue-500 ml-2">{categories.length}</p>{" "}
        </h1>
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 w-[500px] rounded-md focus:outline-none border"
            placeholder="Search..."
          />
        </div>
        <button
          onClick={(e) => handleAdd(e)}
          className="bg-blue-500 text-sm font-semibold text-white px-9 py-3 rounded-md"
        >
          Add category
        </button>
      </div>

      {/* Table */}
      <div className="w-[80%] overflow-hidden bg-white p-6 shadow rounded-lg">
        <table className="w-full border-collapse">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Added On</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {_filteredCategories.map((item) => (
              <tr key={item._id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.addedOn.split("T")[0]}</td>
                <td className="p-3 flex justify-center space-x-3">
                  <button
                    className="px-4 py-2 bg-indigo-500 text-white text-sm rounded-lg hover:bg-indigo-600"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
                    onClick={(e) => handleDelete(e, item._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
