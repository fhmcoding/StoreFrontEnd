<template>
    <div v-if="isLoading" class="px-5 py-4">
        <nav class="flex items-center justify-between border-t border-gray-200 dark:border-gray-500 px-4 sm:px-0">
            <div class="-mt-px flex w-0 flex-1">
                <a @click="paginate.prev > 0 ? props.goToPage(paginate.prev) : false" :class="[paginate.prev > 0 ? 'cursor-pointer text-gray-500 hover:text-gray-700 hover:border-gray-300' : 'text-gray-300 hover:text-gray-300', 'inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium']">
                    <ArrowLongLeftIcon :class="[paginate.prev > 0 ? 'text-gray-400' : 'text-gray-300','mr-3 h-5 w-5']" aria-hidden="true" />
                    Previous
                </a>
            </div>
            <div class="hidden md:-mt-px md:flex">
                <template v-for="page in paginate.pages" :key="page">
                    <a v-if="page == paginate.current" href="#" class="inline-flex items-center border-t-2 border-primary px-4 pt-4 text-sm font-medium text-primary" aria-current="page">{{ paginate.current }}</a>
                    <span v-else-if="page == 0" class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">...</span>
                    <a v-else @click="props.goToPage(page)" href="#" class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">{{ page }}</a>
                </template>
            </div>
            <div class="-mt-px flex w-0 flex-1 justify-end">
                <a @click="paginate.next <= paginate.last ? props.goToPage(paginate.next) : false" :class="[paginate.next <= paginate.last ? 'cursor-pointer text-gray-500 hover:text-gray-700 hover:border-gray-300' : 'text-gray-300 hover:text-gray-300', 'inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium']">
                    Next
                    <ArrowLongRightIcon :class="[paginate.next <= paginate.last ? 'text-gray-400' : 'text-gray-300','ml-3 h-5 w-5']" aria-hidden="true" />
                </a>
            </div>
        </nav>
    </div>
</template>

<script setup>
    import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/20/solid'
    import { ref,onMounted } from 'vue'

    const isLoading = ref(false)
    const paginate = ref([])
    const props = defineProps({
        links: Object,
        goToPage: ''
    })

    onMounted( async() => {
        paginate.value = {
            prev: props.links.current_page - 1,
            current: props.links.current_page,
            next: props.links.current_page + 1,
            last: props.links.last_page,
            total_rows: props.links.total,
            pages: [],
        }

        var totalPages = paginate.value.last;
        var pagesToShow = 2; // show 3 pages before and after current page

        // calculate range of pages to show
        var startPage = Math.max(1, paginate.value.current - pagesToShow);
        var endPage = Math.min(totalPages, paginate.value.current + pagesToShow);

        // build list of page links
        var pages = [];

        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) {
                pages.push(2);
                if (startPage > 3) {
                    pages.push(0);
                }
            }
        }

        for (var i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages - 1) {
            if (endPage < totalPages - 2) {
                if (endPage < totalPages - 3) {
                    pages.push(0);
                }
                pages.push(totalPages - 1);
            }
            pages.push(totalPages);
        }

        paginate.value.pages = pages

        isLoading.value = true
    })
</script>