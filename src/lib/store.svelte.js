const STORAGE_KEY = 'dietpick_selections'

let _liked = $state(new Set())
let _disliked = $state(new Set())

export function getLiked() { return _liked }
export function getDisliked() { return _disliked }

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const data = JSON.parse(saved)
      _liked = new Set(data.liked ?? [])
      _disliked = new Set(data.disliked ?? [])
    }
  } catch { /* ignore */ }
}

function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      liked: [..._liked],
      disliked: [..._disliked],
    }))
  } catch { /* ignore */ }
}

loadFromStorage()

export function toggleLike(id) {
  if (_liked.has(id)) _liked.delete(id); else _liked.add(id)
  _disliked.delete(id)
  _liked = new Set(_liked)
  _disliked = new Set(_disliked)
  saveToStorage()
}

export function toggleDislike(id) {
  if (_disliked.has(id)) _disliked.delete(id); else _disliked.add(id)
  _liked.delete(id)
  _liked = new Set(_liked)
  _disliked = new Set(_disliked)
  saveToStorage()
}

export function clearSelection(id) {
  _liked.delete(id)
  _disliked.delete(id)
  _liked = new Set(_liked)
  _disliked = new Set(_disliked)
  saveToStorage()
}

export function resetAll() {
  _liked = new Set()
  _disliked = new Set()
  saveToStorage()
}
