import { useState } from "react"
import AddBook from "./components/AddBook"
import BookList from "./components/BookList"
import BorrowBook from "./components/BorrowBook"
import History from "./components/History"
import Students from "./components/Students"
import Alerts from "./components/Alerts"

export default function App() {
  const [page, setPage] = useState("livres")

  const nav = [
    { id: "livres", label: "📚", text: "Livres" },
    { id: "ajouter", label: "➕", text: "Ajouter" },
    { id: "emprunter", label: "🔄", text: "Emprunts" },
    { id: "eleves", label: "👤", text: "Élèves" },
    { id: "alertes", label: "⚠️", text: "Alertes" },
    { id: "historique", label: "📋", text: "Historique" },
  ]

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-blue-700 text-white p-4 text-center">
        <h1 className="text-xl font-bold">📖 Bibliothèque Scolaire</h1>
      </div>

      <div className="flex-1 p-4 pb-24">
        {page === "livres" && <BookList />}
        {page === "ajouter" && <AddBook />}
        {page === "emprunter" && <BorrowBook />}
        {page === "eleves" && <Students />}
        {page === "alertes" && <Alerts />}
        {page === "historique" && <History />}
      </div>

      <div className="bg-white border-t flex justify-around p-2 fixed bottom-0 left-0 right-0 max-w-md mx-auto">
        {nav.map((item) => (
          <button key={item.id} onClick={() => setPage(item.id)}
            className={`flex flex-col items-center text-xs p-1 rounded-lg ${
              page === item.id ? "text-blue-700 font-bold" : "text-gray-500"
            }`}>
            <span className="text-lg">{item.label}</span>
            <span>{item.text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}