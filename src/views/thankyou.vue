<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">

  <!-- Check Icon -->
  <div class="bg-green-100 p-4 rounded-full">
    <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" stroke-width="2"
         viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round"
            d="M4.5 12.75l6 6 9-13.5"/>
    </svg>
  </div>

  <!-- Title -->
  <h1 class="mt-6 text-2xl font-bold text-gray-700 text-center">
    Merci pour votre commande !
  </h1>

  <!-- Message -->
  <p class="mt-2 text-gray-600 text-center max-w-md">
    Votre commande a été bien reçue.  
    Notre équipe s’occupe de la préparer et un livreur vous contactera bientôt.
  </p>

  <!-- Order Info -->
  <div class="mt-6 bg-white shadow rounded-xl p-4 w-full max-w-sm">
    <p class="text-gray-700 text-sm">
      Numéro de commande :
      <span class="font-semibold text-gray-900">{{ orderId }}</span>
    </p>

    <p class="text-gray-700 text-sm mt-2">
      Montant total :
      <span class="font-semibold text-gray-900">{{ total }} MAD</span>
    </p>
  </div>

  <!-- Back to Home button -->
  <router-link
    to="/"
    class="mt-8 px-6 py-3 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
  >
    Retour à l’accueil
  </router-link>

</div>

</template>


<script setup>

</script>