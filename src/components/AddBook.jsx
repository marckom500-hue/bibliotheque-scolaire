import { useState } from "react"

export default function AddBook() {
  const [titre, setTitre] = useState("")
  const [auteur, setAuteur] = useState("")
  const [msg, setMsg] = useState("")

  const ajouterLivre = () => {
    if (!titre || !auteur) { setMsg("⚠️ Remplis tous les champs !"); return }
    const livres = JSON.parse(localStorage.getItem("livres") || "[]")
    livres.push({ id: Date.now(), titre, auteur, disponible: true })
    localStorage.setItem("livres", JSON.stringify(livres))
    setTitre(""); setAuteur("")
    setMsg("✅ Livre ajouté avec succès !")
    setTimeout(() => setMsg(""), 3000)
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-4">Ajouter un livre</h2>
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <label className="block text-sm text-gray-600 mb-1">Titre du livre</label>
        <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)}
          placeholder="Ex: Le Petit Prince"
          className="w-full border rounded-lg p-3 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <label className="block text-sm text-gray-600 mb-1">Auteur</label>
        <input type="text" value={auteur} onChange={(e) => setAuteur(e.target.value)}
          placeholder="Ex: Antoine de Saint-Exupéry"
          className="w-full border rounded-lg p-3 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <button onClick={ajouterLivre}
          className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold">
          ➕ Ajouter le livre
        </button>
        {msg && <p className="text-center mt-3 text-sm font-medium text-blue-700">{msg}</p>}
      </div>
    </div>
  )
}