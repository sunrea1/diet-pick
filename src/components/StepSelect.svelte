<script>
  import { foods } from '../data/foods.js'
  import { getLiked, getDisliked, toggleLike, toggleDislike, clearSelection, resetAll } from '../lib/store.svelte.js'
  import ProgressBar from './ProgressBar.svelte'
  import FoodGrid from './FoodGrid.svelte'
  import { fade } from 'svelte/transition'

  let { ongenerate } = $props()
  let liked = $derived(getLiked())
  let disliked = $derived(getDisliked())

  function handleChange(id, state) {
    if (state === 'liked') toggleLike(id)
    else if (state === 'disliked') toggleDislike(id)
    else clearSelection(id)
  }

  function handleGenerate() { ongenerate?.() }
  function handleReset() { resetAll() }
</script>

<div transition:fade={{ duration: 300 }} class="max-w-3xl mx-auto px-4 py-6">
  <header class="text-center mb-6">
    <h1 class="text-2xl font-bold text-neutral-800 mb-1">DietPick</h1>
    <p class="text-sm text-neutral-500">点选你喜欢的食物 ❤️ 和不喜欢的食物 ❌</p>
  </header>

  <div class="mb-6">
    <ProgressBar liked={liked.size} disliked={disliked.size} total={foods.length} />
  </div>

  <div class="mb-6 flex items-center justify-between">
    <nav class="flex gap-1.5 flex-wrap">
      {#each [{ id: 'protein', emoji: '🥩' }, { id: 'vegetable', emoji: '🥬' }, { id: 'fruit', emoji: '🍎' }, { id: 'carb', emoji: '🍚' }, { id: 'dairy', emoji: '🥛' }, { id: 'fat', emoji: '🥑' }, { id: 'beverage', emoji: '☕' }] as cat}
        <a href="#cat-{cat.id}" class="text-lg px-2.5 py-1 rounded-lg hover:bg-neutral-200/60 transition-colors">{cat.emoji}</a>
      {/each}
    </nav>
    <button onclick={handleReset} class="text-xs text-neutral-400 hover:text-neutral-600 px-3 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors" type="button">重置</button>
  </div>

  <FoodGrid {liked} {disliked} onchange={handleChange} />

  <div class="mt-8 text-center pb-8">
    <button
      onclick={handleGenerate}
      disabled={liked.size === 0}
      class="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-white font-semibold text-base
        transition-all duration-200 ease-out
        {liked.size === 0 ? 'bg-neutral-300 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-200 active:scale-[0.97]'}"
      type="button"
    >
      生成减重食谱 &#10132;
    </button>
    {#if liked.size === 0}
      <p class="text-xs text-neutral-400 mt-2">至少选择一种喜欢的食物才能生成</p>
    {/if}
  </div>
</div>
