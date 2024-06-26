<template>
    <!-- Hero section -->
    <div class="relative bg-gray-900">
        <div
            class="relative mx-auto flex max-w-3xl flex-col items-center py-32 px-6 text-center sm:py-64 lg:px-0"
        >
            <h1
                class="text-4xl font-bold tracking-tight text-white lg:text-6xl"
            >
                New arrivals are here
            </h1>
            <p class="mt-4 text-xl text-white">
                The new arrivals have, well, newly arrived. Check out the latest
                options from our summer small-batch release while they're still
                in stock.
            </p>
            <a
                href="#"
                class="mt-8 inline-block rounded-md border border-transparent bg-white py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100"
                >Shop New Arrivals</a
            >
        </div>
    </div>

    <main>
        <Categories />

        <section
            aria-labelledby="social-impact-heading"
            class="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8"
        >
            <div class="relative overflow-hidden rounded-lg">
                <div class="absolute inset-0">
                    <img
                        src="https://tailwindui.com/img/ecommerce-images/home-page-01-feature-section-01.jpg"
                        alt=""
                        class="h-full w-full object-cover object-center"
                    />
                </div>
                <div
                    class="relative bg-gray-900 bg-opacity-75 py-32 px-6 sm:py-40 sm:px-12 lg:px-16"
                >
                    <div
                        class="relative mx-auto flex max-w-3xl flex-col items-center text-center"
                    >
                        <h2
                            id="social-impact-heading"
                            class="text-3xl font-bold tracking-tight text-white sm:text-4xl"
                        >
                            <span class="block sm:inline">Level up</span>
                            <span class="block sm:inline">your desk</span>
                        </h2>
                        <p class="mt-3 text-xl text-white">
                            Make your desk beautiful and organized. Post a
                            picture to social media and watch it get more likes
                            than life-changing announcements. Reflect on the
                            shallow nature of existence. At least you have a
                            really nice desk setup.
                        </p>
                        <a
                            href="#"
                            class="mt-8 block w-full rounded-md border border-transparent bg-white py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
                            >Shop Workspace</a
                        >
                    </div>
                </div>
            </div>
        </section>

        <Products />

        <div class="bg-white">
            <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div class="rounded-2xl bg-gray-50 px-6 py-16 sm:p-16">
                <div class="mx-auto max-w-xl lg:max-w-none">
                <div class="text-center">
                    <h2 class="text-2xl font-bold tracking-tight text-gray-900">We built our business on customer service</h2>
                </div>
                <div class="mx-auto mt-12 grid max-w-sm grid-cols-1 gap-y-10 gap-x-8 sm:max-w-none lg:grid-cols-3">
                    <div v-for="incentive in incentives" :key="incentive.name" class="text-center sm:flex sm:text-left lg:block lg:text-center">
                    <div class="sm:flex-shrink-0">
                        <div class="flow-root">
                        <img class="mx-auto h-16 w-16" :src="incentive.imageSrc" alt="" />
                        </div>
                    </div>
                    <div class="mt-3 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                        <h3 class="text-sm font-medium text-gray-900">{{ incentive.name }}</h3>
                        <p class="mt-2 text-sm text-gray-500">{{ incentive.description }}</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

import { ChevronDownIcon } from '@heroicons/vue/20/solid'

import Categories from '@/components/Categories.vue'
import Products from '@/components/Products.vue'


const navigation = {
  categories: [
    {
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
        {
          name: 'Accessories',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
          imageAlt: 'Model wearing minimalist watch with black wristband and white watch face.',
        },
        {
          name: 'Carry',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-04.jpg',
          imageAlt: 'Model opening tan leather long wallet with credit card pockets and cash pouch.',
        },
      ],
    },
    {
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg',
          imageAlt: 'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg',
          imageAlt: 'Model wearing light heather gray t-shirt.',
        },
        {
          name: 'Accessories',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-03.jpg',
          imageAlt:
            'Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.',
        },
        {
          name: 'Carry',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-04.jpg',
          imageAlt: 'Model putting folded cash into slim card holder olive leather wallet with hand stitching.',
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
}

const incentives = [
  {
    name: 'Free shipping',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg',
    description: "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
  },
  {
    name: '10-year warranty',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg',
    description: "If it breaks in the first 10 years we'll replace it. After that you're on your own though.",
  },
  {
    name: 'Exchanges',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-exchange-simple.svg',
    description:
      "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
  },
]



</script>
