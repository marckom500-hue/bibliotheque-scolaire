import { useState, useEffect } from "react"

const CATEGORIES = ["Tous", "Roman", "Science", "Histoire", "Mathématiques", "Littérature", "Informatique", "Autre"]

export default function BookList() {
  const [livres, setLivres] = useState([])
  const [filtre, setFiltre] = useState("tous")
  const [categorie, setCategorie] = useState("Tous")
  const [recherche, setRecherche] = useState("")

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("livres") || "[]")
    setLivres(data)
  }, [])

  const livresFiltres = livres
    .filter((l) => {
      if (filtre === "disponibles") return l.disponible
      if (filtre === "empruntes") return !l.disponible
      return true
    })
    .filter((l) => categorie === "Tous" || l.categorie === categorie)
    .filter((l) =>
      l.titre.toLowerCase().includes(recherche.toLowerCase()) ||
      l.auteur.toLowerCase().includes(recherche.toLowerCase())
    )

  const supprimerLivre = (id) => {
    if (!confirm("Supprimer ce livre ?")) return
    const updated = livres.filter((l) => l.id !== id)
    localStorage.setItem("livres", JSON.stringify(updated))
    setLivres(updated)
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-3">Liste des livres</h2>

      {/* Recherche */}
      <input type="text" value={recherche} onChange={(e) => setRecherche(e.target.value)}
        placeholder="🔍 Rechercher titre ou auteur..."
        className="w-full border rounded-lg p-3 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />

      {/* Filtre disponibilité */}
      <div className="flex gap-2 mb-3">
        {["tous", "disponibles", "empruntes"].map((f) => (
          <button key={f} onClick={() => setFiltre(f)}
            className={`px-3 py-1 rounded-full text-sm capitalize ${
              filtre === f ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-600"
            }`}>
            {f}
          </button>
        ))}
      </div>

      {/* Filtre catégorie */}
      <select value={categorie} onChange={(e) => setCategorie(e.target.value)}
        className="w-full border rounded-lg p-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {/* Compteur */}
      <p className="text-xs text-gray-400 mb-3">{livresFiltres.length} livre(s) trouvé(s)</p>

      {/* Liste */}
      {livresFiltres.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">Aucun livre trouvé</p>
      ) : (
        livresFiltres.map((livre) => (
          <div key={livre.id} className="bg-white rounded-xl p-4 mb-3 shadow-sm border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-gray-800">{livre.titre}</p>
                <p className="text-sm text-gray-500">✍️ {livre.auteur}</p>
                {livre.categorie && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full mt-1 inline-block">
                    📂 {livre.categorie}
                  </span>
                )}
              </div>
              <button onClick={() => supprimerLivre(livre.id)}
                className="text-red-400 text-xs border border-red-200 px-2 py-1 rounded-lg">
                🗑️
              </button>
            </div>
            <span className={`text-xs mt-2 inline-block px-2 py-1 rounded-full ${
              livre.disponible ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}>
              {livre.disponible ? "✅ Disponible" : "❌ Emprunté"}
            </span>
          </div>
        ))
      )}
    </div>
  )
}