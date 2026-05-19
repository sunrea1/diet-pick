<script>
  import StepSelect from './components/StepSelect.svelte'
  import StepResult from './components/StepResult.svelte'

  let step = $state('select')

  function handleGenerate() {
    step = 'result'
  }

  function handleBack() {
    step = 'select'
  }
</script>

{#if step === 'select'}
  <StepSelect ongenerate={handleGenerate} />
{:else}
  <StepResult onback={handleBack} />
{/if}
