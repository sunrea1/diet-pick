<script>
  import { foods, categories } from '../data/foods.js'
  import { toggleLike, toggleDislike, clearSelection, getLiked, getDisliked } from '../lib/store.svelte.js'
  import { fly } from 'svelte/transition'

  let { ongenerate } = $props()

  let liked = $derived(getLiked())
  let disliked = $derived(getDisliked())

  let isDone = $derived(currentIndex >= queued.length)
  let progressPct = $derived(queued.length > 0 ? Math.round(currentIndex / queued.length * 100) : 0)

  const queued = $state(shuffle([...foods]))
  let currentIndex = $state(0)
  let animKey = $state(0)
  let action = $state(null)

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }

  function advance(a) {
    const food = queued[currentIndex]
    if (a === 'like') toggleLike(food.id)
    else if (a === 'dislike') toggleDislike(food.id)
    else clearSelection(food.id)
    action = a
    animKey++
    currentIndex++
  }

  function currentFood() {
    if (currentIndex < queued.length) {
      return queued[currentIndex]
    }
    return null
  }

  function handleGenerate() {
    ongenerate?.()
  }
</script>

<div class="flex flex-col h-dvh max-h-dvh overflow-hidden bg-neutral-50">
  <header class="px-4 pt-5 pb-3 flex-shrink-0">
    <h1 class="text-lg font-bold text-neutral-800 text-center mb-3">DietPick</h1>
    <div class="flex items-center gap-3">
      <div class="flex-1 h-2 rounded-full bg-neutral-200 overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-500 ease-out"
          class:bg-gradient-to-r={progressPct > 0}
          class:from-emerald-400={progressPct > 0}
          class:to-emerald-500={progressPct > 0}
          style="width: {progressPct}%"
        ></div>
      </div>
      <span class="text-xs text-neutral-400 font-medium tabular-nums flex-shrink-0">
        {currentIndex}/{queued.length}
      </span>
    </div>
  </header>

  {#if !isDone}
    <div class="flex-1 flex items-center justify-center px-6 overflow-hidden">
      {#key animKey}
        <div
          transition:fly={{
            x: action === 'dislike' ? -120 : action === 'like' ? 120 : 0,
            y: action === 'skip' ? 60 : 0,
            opacity: 0,
            duration: 280,
          }}
          class="w-full max-w-sm"
        >
          <div class="rounded-3xl bg-white border border-neutral-200 card-shadow overflow-hidden">
            <div class="flex flex-col items-center py-10 px-6 text-center">
              <span class="text-6xl mb-4 leading-none">{currentFood()?.emoji}</span>
              <h2 class="text-xl font-bold text-neutral-800 mb-1">{currentFood()?.name}</h2>
              <span class="text-sm text-neutral-400">{currentFood()?.calories} kcal</span>
              <span class="text-xs text-neutral-300 mt-1">{currentFood()?.serving} · {categories.find(c => c.id === currentFood()?.category)?.name}</span>
            </div>
            <div class="px-6 pb-6">
              <div class="rounded-2xl bg-neutral-50 border border-neutral-100 p-3">
                <div class="flex justify-around text-xs text-neutral-500">
                  <span class="flex flex-col items-center gap-0.5">
                    <span class="font-medium text-neutral-700">{currentFood()?.protein}g</span>
                    <span>蛋白质</span>
                  </span>
                  <span class="flex flex-col items-center gap-0.5">
                    <span class="font-medium text-neutral-700">{currentFood()?.carbs}g</span>
                    <span>碳水</span>
                  </span>
                  <span class="flex flex-col items-center gap-0.5">
                    <span class="font-medium text-neutral-700">{currentFood()?.fat}g</span>
                    <span>脂肪</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/key}
    </div>

    <div class="flex-shrink-0 px-6 pb-8 pt-2">
      <div class="flex items-center justify-center gap-4">
        <button
          onclick={() => advance('dislike')}
          class="flex items-center justify-center w-14 h-14 rounded-full bg-white border-2 border-rose-200 text-rose-400 text-xl
            active:scale-90 active:bg-rose-50 transition-all duration-150"
          type="button"
          aria-label="不喜欢"
        >&#10005;</button>

        <button
          onclick={() => advance('skip')}
          class="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-neutral-200 text-neutral-400 text-lg
            active:scale-90 active:bg-neutral-50 transition-all duration-150"
          type="button"
          aria-label="跳过"
        >&#9654;</button>

        <button
          onclick={() => advance('like')}
          class="flex items-center justify-center w-14 h-14 rounded-full bg-white border-2 border-emerald-200 text-emerald-400 text-xl
            active:scale-90 active:bg-emerald-50 transition-all duration-150"
          type="button"
          aria-label="喜欢"
        >&#10084;</button>
      </div>

      <div class="flex justify-center gap-6 mt-3">
        <span class="text-[10px] text-rose-300 font-medium">不喜欢</span>
        <span class="text-[10px] text-neutral-300 font-medium">跳过</span>
        <span class="text-[10px] text-emerald-300 font-medium">喜欢</span>
      </div>

      <div class="mt-6 flex justify-center gap-2 flex-wrap">
        <span class="text-xs text-neutral-400">
          已选: ❤️ {liked.size} / ❌ {disliked.size}
        </span>
      </div>
    </div>
  {:else}
    <div class="flex-1 flex flex-col items-center justify-center px-6 text-center">
      <span class="text-5xl mb-4">🎉</span>
      <h2 class="text-xl font-bold text-neutral-800 mb-2">全部选完！</h2>
      <p class="text-sm text-neutral-500 mb-1">喜欢 {liked.size} 种 · 不喜欢 {disliked.size} 种</p>
      <p class="text-xs text-neutral-400 mb-8">已为你跳过 {foods.length - liked.size - disliked.size} 种</p>

      <button
        onclick={handleGenerate}
        disabled={liked.size === 0}
        class="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-white font-semibold text-base
          transition-all duration-200 ease-out
          {liked.size === 0
            ? 'bg-neutral-300 cursor-not-allowed'
            : 'bg-emerald-500 hover:bg-emerald-600 active:scale-[0.97]'}"
        type="button"
      >
        生成减重食谱 &#10132;
      </button>
      {#if liked.size === 0}
        <p class="text-xs text-neutral-400 mt-2">至少喜欢一种食物才能生成</p>
      {/if}
    </div>
  {/if}
</div>
