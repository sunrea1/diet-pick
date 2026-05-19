<script>
  import { foods } from '../data/foods.js'
  import { getLiked, getDisliked, toggleLike, toggleDislike, clearSelection, resetAll } from '../lib/store.svelte.js'
  import ProgressBar from './ProgressBar.svelte'
  import FoodGrid from './FoodGrid.svelte'
  import CardQueue from './CardQueue.svelte'
  import { fade } from 'svelte/transition'

  let { ongenerate } = $props()
  let liked = $derived(getLiked())
  let disliked = $derived(getDisliked())

  let isMobile = $state(false)
  let useQueue = $state(false)

  $effect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    isMobile = mq.matches
    useQueue = mq.matches
    const handler = (e) => {
      isMobile = e.matches
      useQueue = e.matches
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  })

  function handleChange(id, state) {
    if (state === 'liked') toggleLike(id)
    else if (state === 'disliked') toggleDislike(id)
    else clearSelection(id)
  }

  function handleGenerate() { ongenerate?.() }
  function handleReset() { resetAll() }
  function toggleView() { useQueue = !useQueue }
</script>

{#if useQueue}
  <CardQueue {ongenerate} />
{:else}
  <div transition:fade={{ duration: 300 }} class="max-w-3xl mx-auto px-4 py-6">
    <header class="text-center mb-4">
      <div class="flex items-center justify-center gap-3">
        <h1 class="text-2xl font-bold text-neutral-800">DietPick</h1>
        {#if isMobile}
          <button
            onclick={toggleView}
            class="text-xs text-emerald-500 hover:text-emerald-600 px-2.5 py-1 rounded-lg border border-emerald-200 bg-emerald-50/50 transition-colors"
            type="button"
          >快速模式</button>
        {:else}
          <button
            onclick={toggleView}
            class="text-xs text-neutral-400 hover:text-neutral-600 px-2.5 py-1 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors"
            type="button"
          >逐张模式</button>
        {/if}
      </div>
      <p class="text-sm text-neutral-500 mt-1">点选你喜欢的食物 ❤️ 和不喜欢的食物 ❌</p>
    </header>

    <div class="mb-5">
      <ProgressBar liked={liked.size} disliked={disliked.size} total={foods.length} />
    </div>

    <div class="mb-5 flex items-center justify-between">
      <nav class="flex gap-1.5 flex-wrap">
        {#each [{ id: 'protein', emoji: '🥩' }, { id: 'vegetable', emoji: '🥬' }, { id: 'fruit', emoji: '🍎' }, { id: 'carb', emoji: '🍚' }, { id: 'dairy', emoji: '🥛' }, { id: 'fat', emoji: '🥑' }, { id: 'beverage', emoji: '☕' }] as cat}
          <a href="#cat-{cat.id}" class="text-lg px-2.5 py-1 rounded-lg hover:bg-neutral-200/60 transition-colors">{cat.emoji}</a>
        {/each}
      </nav>
      <button onclick={handleReset} class="text-xs text-neutral-400 hover:text-neutral-600 px-3 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors" type="button">重置</button>
    </div>

    <FoodGrid {liked} {disliked} onchange={handleChange} />

    <div class="mt-8 text-center pb-8 space-y-3">
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
        <p class="text-xs text-neutral-400">至少选择一种喜欢的食物才能生成</p>
      {/if}

      <div>
        <button
          onclick={handleGenerate}
          disabled={liked.size + disliked.size < 20}
          class="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium
            transition-all duration-200 ease-out
            {liked.size + disliked.size < 20
              ? 'text-neutral-300 cursor-not-allowed'
              : 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 active:scale-[0.97] border border-emerald-200 hover:border-emerald-300'}"
          type="button"
        >
          直接生成
          <span class="tabular-nums text-xs">
            ({liked.size + disliked.size}/20)
          </span>
        </button>
        {#if liked.size + disliked.size < 20}
          <p class="text-xs text-neutral-400 mt-1">选满 20 种即可直接生成（当前已选 {liked.size + disliked.size} 种）</p>
        {:else}
          <p class="text-xs text-emerald-500 mt-1">已满 20 种，可直接生成</p>
        {/if}
      </div>
    </div>
  </div>
{/if}
