import { useState, useEffect } from "react"

export default function BorrowBook() {
  const [livres, setLivres] = useState([])
  const [eleve, setEleve] = useState("")
  const [livreId, setLivreId] = useState("")
  const [msg, setMsg] = useState("")
  const [onglet, setOnglet] = useState("emprunter")

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("livres") || "[]")
    setLivres(data)
  }, [])

  const livresDisponibles = livres.filter((l) => l.disponible)
  const livresEmpruntes = livres.filter((l) => !l.disponible)

  const emprunter = () => {
    if (!eleve || !livreId) { setMsg("⚠️ Remplis tous les champs !"); return }
    const tous = JSON.parse(localStorage.getItem("livres") || "[]")
    const updated = tous.map((l) =>
      l.id === parseInt(livreId)
        ? { ...l, disponible: false, empruntePar: eleve, dateEmprunt: new Date().toLocaleDateString("fr-FR") }
        : l
    )
    localStorage.setItem("livres", JSON.stringify(updated))
    const historique = JSON.parse(localStorage.getItem("historique") || "[]")
    const livre = tous.find((l) => l.id === parseInt(livreId))
    historique.push({ id: Date.now(), titre: livre.titre, auteur: livre.auteur, eleve, dateEmprunt: new Date().toLocaleDateString("fr-FR"), dateRetour: null })
    localStorage.setItem("historique", JSON.stringify(historique))
    setLivres(updated); setEleve(""); setLivreId("")
    setMsg("✅ Emprunt enregistré !")
    setTimeout(() => setMsg(""), 3000)
  }

  const retourner = (id) => {
    const tous = JSON.parse(localStorage.getItem("livres") || "[]")
    const livre = tous.find((l) => l.id === id)
    const updated = tous.map((l) =>
      l.id === id ? { ...l, disponible: true, empruntePar: null, dateEmprunt: null } : l
    )
    localStorage.setItem("livres", JSON.stringify(updated))
    const historique = JSON.parse(localStorage.getItem("historique") || "[]")
    const updatedHist = historique.map((h) =>
      h.titre === livre.titre && !h.dateRetour
        ? { ...h, dateRetour: new Date().toLocaleDateString("fr-FR") } : h
    )
    localStorage.setItem("historique", JSON.stringify(updatedHist))
    setLivres(updated)
    setMsg("✅ Retour enregistré !")
    setTimeout(() => setMsg(""), 3000)
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-4">Gestion des emprunts</h2>
      <div className="flex gap-2 mb-4">
        {["emprunter", "retourner"].map((o) => (
          <button key={o} onClick={() => setOnglet(o)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold ${
              onglet === o ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-600"
            }`}>
            {o === "emprunter" ? "📤 Emprunter" : "📥 Retourner"}
          </button>
        ))}
      </div>
      {msg && <p className="text-center mb-3 text-sm font-medium text-blue-700">{msg}</p>}
      {onglet === "emprunter" && (
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <label className="block text-sm text-gray-600 mb-1">Nom de l'élève</label>
          <input type="text" value={eleve} onChange={(e) => setEleve(e.target.value)}
            placeholder="Ex: Jean Dupont"
            className="w-full border rounded-lg p-3 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <label className="block text-sm text-gray-600 mb-1">Choisir un livre</label>
          <select value={livreId} onChange={(e) => setLivreId(e.target.value)}
            className="w-full border rounded-lg p-3 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">-- Sélectionner --</option>
            {livresDisponibles.map((l) => (
              <option key={l.id} value={l.id}>{l.titre} — {l.auteur}</option>
            ))}
          </select>
          <button onClick={emprunter}
            className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold">
            📤 Confirmer l'emprunt
          </button>
        </div>
      )}
      {onglet === "retourner" && (
        <div>
          {livresEmpruntes.length === 0 ? (
            <p className="text-center text-gray-400 mt-10">Aucun livre emprunté</p>
          ) : (
            livresEmpruntes.map((l) => (
              <div key={l.id} className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                <p className="font-bold text-gray-800">{l.titre}</p>
                <p className="text-sm text-gray-500">✍️ {l.auteur}</p>
                <p className="text-sm text-orange-600">👤 {l.empruntePar}</p>
                <p className="text-xs text-gray-400">📅 Emprunté le {l.dateEmprunt}</p>
                <button onClick={() => retourner(l.id)}
                  className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg text-sm font-semibold">
                  📥 Retourner ce livre
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}