import React from "react";
import TableLoader from "@/components/partials/TableLoader";


const products = [
  { id: 1, title: "Papaya", price: 75, category: "Fruits" },
  { id: 2, title: "Ampalaya", price: 45, category: "Vegetables" },
  { id: 3, title: "Sitaw", price: 50, category: "Vegetables" },
  { id: 4, title: "Mais", price: 35, category: "Fruits" },
  { id: 5, title: "Luya", price: 75, category: "Herbs & Spices" },
  { id: 6, title: "Calabasa", price: 55, category: "Vegetables" },
  { id: 7, title: "Pechay", price: 45, category: "Vegetables" },
  { id: 8, title: "Patatas", price: 35, category: "Vegetables" },
  { id: 9, title: "Sibuyas", price: 80, category: "Herbs & Spices" },
  { id: 10, title: "Bawang", price: 65, category: "Herbs & Spices" },
  { id: 11, title: "Okra", price: 59, category: "Vegetables" },
  { id: 12, title: "Sili", price: 90, category: "Herbs & Spices" },
];

const ProductTable = () => {
  return (
    <div className="p-4 bg-secondary rounded-md mt-10 border border-line relative m-2">
      <div className="table-wrapper custom-scroll">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-10">
                  <IconNoData />
                </td>
              </tr>
            ) : (
              products.map((item, index) => (
                <tr key={item.id} className="group relative cursor-pointer">
                  <td className="text-center">{index + 1}.</td>
                  <td>{item.title}</td>
                  <td>P{item.price.toFixed(2)}</td>
                  <td>{item.category}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
