import { useState } from "react"
import AddBook from "./components/AddBook"
import BookList from "./components/BookList"
import BorrowBook from "./components/BorrowBook"
import History from "./components/History"

export default function App() {
  const [page, setPage] = useState("livres")

  const nav = [
    { id: "livres", label: "📚 Livres" },
    { id: "ajouter", label: "➕ Ajouter" },
    { id: "emprunter", label: "🔄 Emprunts" },
    { id: "historique", label: "📋 Historique" },
  ]

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-blue-700 text-white p-4 text-center">
        <h1 className="text-xl font-bold">📖 Bibliothèque Scolaire</h1>
      </div>
      <div className="flex-1 p-4">
        {page === "livres" && <BookList />}
        {page === "ajouter" && <AddBook />}
        {page === "emprunter" && <BorrowBook />}
        {page === "historique" && <History />}
      </div>
      <div className="bg-white border-t flex justify-around p-2 sticky bottom-0">
        {nav.map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`flex flex-col items-center text-xs p-2 rounded-lg ${
              page === item.id ? "text-blue-700 font-bold" : "text-gray-500"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}