<template>
    <div class=" relative flex items-start  bg-gray-200">
        <div class=" sticky left-0 top-0 h-screen w-2/6 bg-white border-r border-gray-300 "> 
            <div class="flex items-center justify-between py-3 px-6 border-b border-gray-200"> 
                <div  class="group gap-2  shrink-0 flex items-center">
                    <routerLink to="/backoffice" type="button" class="flex size-8 items-center justify-center rounded-full bg-white border border-gray-500 outline -outline-offset-1 outline-black/5 w-8 h-8">
                        <HomeIcon class="" />
                    </routerLink>
                    <div class="flex items-center">
                        <div class="ml-3">
                            <p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">{{auth.user.first_name}} {{ auth.user.last_name}}</p>
                            <!-- <p class="text-xs font-medium text-gray-500 group-hover:text-gray-700">{{auth.user.phone_number}}</p> -->
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <routerLink to="/backoffice/caisse/print/status" type="button" class="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-printer"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                        Status
                    </routerLink>
                    <button
                        @click='Logout()'
                        class="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
                        >
                        <!-- Logout Icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            class="w-5 h-5" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor">
                            <path stroke-linecap="round" 
                                stroke-linejoin="round" 
                                stroke-width="2" 
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                        </svg>

                        EXIT
                    </button>
                </div>
            </div>

            <div class=" relative w-full">
                <section aria-labelledby="cart-heading" class=" relative">
                    <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>
                    <div v-if='caisseModel.cart.length > 0'>
                        <ul role="list"   class="divide-y divide-gray-200 px-4 sm:px-6 lg:px-8">
                        <li v-for="item in caisseModel.cart" :key="item.product_id" class="flex py-8 text-sm sm:items-center">
                            <div class="ml-4 grid flex-auto grid-cols-1 grid-rows-1 items-start gap-x-5 gap-y-3 sm:ml-6 sm:flex sm:items-center sm:gap-0">
                            <div class="row-end-1 flex-auto sm:pr-6">

                                <h3 class="font-medium text-gray-900">
                                {{ item.product.name }}
                                </h3>
                                <p class="mt-1 text-black font-semibold">{{ item.price }} DH</p>
                            </div>
                            <div class="flex items-center sm:block sm:flex-none sm:text-center">
                                <div class="flex items-center mt-2">
                                    <button class="px-4 py-2 bg-gray-200 rounded-l font-semibold" @click=" caisseModel.disincrement(item)">–</button>
                                    <span class="px-4 py-2 bg-gray-100 font-semibold">{{ item.quantity }}</span>
                                    <button class="px-4 py-2 bg-gray-200 rounded-r font-semibold" @click=" caisseModel.increment(item)">+</button>
                                </div>
                            </div>
                            </div>
                        </li>
                        </ul>


                       
                    </div>

                    <div class="flex flex-col items-center justify-center text-center py-20" v-else>
                        <svg class="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.5"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25h9.75m-9.75 0L5.106 5.272A1.125 1.125 0 0 0 4.02 4.5H2.25m5.25 9.75 1.384 5.165c.132.492.577.835 1.087.835h6.059m0 0h1.386c.51 0 .955-.343 1.087-.835l1.884-7.03M17.03 20.25a1.875 1.875 0 1 1-3.75 0m3.75 0a1.875 1.875 0 1 1-3.75 0" />
                        </svg>

                        <h2 class="mt-6 text-lg font-semibold text-gray-700">
                            Votre panier est vide
                        </h2>

                        <p class="mt-1 text-gray-500 text-sm">
                            Ajoutez des produits pour commencer votre commande.
                        </p>
                    </div>
                </section>
            </div>
        </div>
        <div class="w-4/6 relative "> 
            <div class="bg-white flex items-center justify-between">
                <div class="flex items-center gap-4 p-4 border-b border-gray-200">
                    <div class="relative">
                        <label for="barcode" class="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900">Barcode</label>
                        <input type="number" v-model="barcode" name="barcode" id="barcode" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="123 45678 99" />
                    </div>
                    <div class="relative">
                        <label for="title" class="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900">Name</label>
                        <input type="text" v-model="product_name" name="title" id="title" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="Product name" />
                    </div>
                    <div class="relative">
                        <label for="location" class="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900">Brand</label>
                        <div class=" grid grid-cols-1">
                            <select v-model="brand_id" id="location" name="location" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6">
                                <option></option>
                                <option v-for="(brand,index) in brandModel.brands" :key="index" :value="brand.id"> {{ brand.name  }}</option>
                            </select>
                            <ChevronDownIcon class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" aria-hidden="true" />
                        </div>
                    </div>
                    <button
                        @click="Refresh()"
                        class="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition"
                        title="Refresh"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-ccw w-5 h-5  text-white"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>
                    </button>
                </div>

                <routerLink v-if="auth.hasPermission('product-create')" to="/backoffice/products/create" type="button" class="text-primary border-primary border bg-white hover:bg-white/15 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2">
                    <PlusCircleIcon class="h-5 mr-1" aria-hidden="true" />
                    Add Product
                </routerLink>
            </div>

            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5"> 
                <div :class="{'opacity-50 cursor-not-allowed' : product.stock_quantity == 0,'border-primary border cursor-pointer':product.stock_quantity > 0}" class="col-span-1 flex flex-col divide-y divide-gray-200  bg-white text-center shadow-sm  hover:shadow-lg" @click="product.stock_quantity == 0 ? false : caisseModel.add(product)" v-for="(product,index) in filteredProducts" :key="index">
                    <div class="flex flex-1 flex-col p-8">
                        <span class="text-red-500 text-sm">stock : {{ product.stock_quantity  }}</span>
                        <span class="text-sm text-gray-500">{{product.product_code}}</span>
                        <h1>{{ product.name }}</h1>
                    </div>
                    <div>
                        <span class="text-lg font-bold">{{ product.sale_price }} dh </span>

                        <button v-show="!caisseModel.inCart(product.product_code)"  class="flex max-w-xs text-sm flex-1 items-center justify-center  border border-transparent bg-primary py-1 px-8 xl:text-base lg:text-base font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full">ajouter</button>
                        
                        <div v-if="caisseModel.inCart(product.product_code)" class="flex items-center mt-2 w-full">
                            <button class="px-4 py-2 w-full bg-gray-200 rounded-l font-semibold" @click="caisseModel.disincrement(caisseModel.cart.find((e) => e.product_id == product.product_code))">–</button>
                            <span class="px-4 py-2 w-full bg-gray-100 font-semibold">{{ caisseModel.cart.find((e) => e.product_id == product.product_code).quantity }}</span>
                            <button class="px-4 py-2 w-full bg-gray-200 rounded-r font-semibold" @click=" caisseModel.increment(caisseModel.cart.find((e) => e.product_id == product.product_code))">+</button>
                        </div>
                    </div>
                </div>
            </div>


             <div class="sticky bottom-0 left-0  bg-white border-t border-gray-200" v-if='caisseModel.cart.length > 0'> 
                <div class="flex justify-between  items-center">
                    <div class="px-4 sm:px-6 lg:px-8 pt-2">
                        <button v-if="selected_user == ''" @click="selectclientModel = true" class="rounded-md bg-white border border-primary px-3 py-2 text-sm font-semibold text-primary flex items-center shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            Select Client
                        </button>
                        <div v-else class="flex items-center gap-2">
                            <button  @click="selected_user = ''" class="rounded-full w-8 h-8  border border-red-600  justify-center  text-sm font-semibold text-red bg-red-200 flex items-center shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x text-red-700"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                            <span>{{ selected_user.first_name }} {{  selected_user.last_name }}</span>
                            
                        </div>
                    </div>
                    <div class="w-1/2"> 
                        <div class="flex px-4 sm:px-6 lg:px-8 items-center justify-between w-full pt-2">
                            <span class=" font-semibold">Number article : </span>
                            <span class=" font-semibold">{{ caisseModel.cartCount }} DH</span>
                        </div>
                        <div class="flex px-4 sm:px-6 lg:px-8 items-center justify-between w-full mb-2">
                            <span class=" font-semibold">TOTAL : </span>
                            <span class=" font-semibold text-xl">{{ caisseModel.cartTotal }} DH</span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-between text-center gap-2 py-1 px-4 sm:px-6 lg:px-8">
                    <button :disabled="!auth.user.payment_methods.cache" @click="selected_payment_method = 'cash' ; checkoutPopup = true" :class="{'bg-gray-200 cursor-not-allowed':!auth.user.payment_methods.cache,'bg-gray-300':auth.user.payment_methods.cache}"  class="w-1/2 bg-gray-300 text-black font-semibold py-3 cursor-pointer hover:bg-gray-600 rounded-sm border">CASH</button>
                    <button :disabled="!auth.user.payment_methods.tpe"  @click="selected_payment_method = 'tpe' ; checkoutPopup = true" :class="{'bg-purple-200 cursor-not-allowed':!auth.user.payment_methods.tpe,'bg-purple-600 hover:bg-purple-700':auth.user.payment_methods.tpe}"   class=" w-1/2  text-white font-semibold py-3   rounded-sm border">TPE</button>
                    <button :disabled="!auth.user.payment_methods.virement"  @click="selected_payment_method = 'virement' ; checkoutPopup = true"  :class="{'bg-red-200 cursor-not-allowed':!auth.user.payment_methods.virement,'bg-red-500 hover:bg-red-600':auth.user.payment_methods.virement}"  class="w-1/2  text-white font-semibold py-3  rounded-sm border">virement</button>
                    <button :disabled="!auth.user.payment_methods.cheque"  @click="selected_payment_method = 'cheque' ; checkoutPopup = true"  :class="{'bg-blue-200 cursor-not-allowed':!auth.user.payment_methods.cheque,'bg-blue-500 hover:bg-blue-600':auth.user.payment_methods.cheque}" class="w-1/2  text-white font-semibold py-3  rounded-sm border">Cheque</button>
                    <button :disabled="!auth.user.payment_methods.credit" @click="selected_payment_method = 'credit' ; checkoutPopup = true"  :class="{'bg-orange-200 cursor-not-allowed':!auth.user.payment_methods.credit,'bg-orange-500 hover:bg-orange-600':auth.user.payment_methods.credit}" class="w-1/2  text-white font-semibold py-3 rounded-sm border">Credit</button>
                    <button  @click="selected_payment_method = 'mixte' ; mixtePaymentMethod = true"  class="w-1/2  text-white font-semibold py-3 rounded-sm border bg-black">Mixte</button>
                </div>
            </div>
        </div>

        <TransitionRoot as="template" :show="selectclientModel">
            <Dialog class="relative z-10" @close="selectclientModel = false">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="" leave="ease-in duration-200" leave-from="" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500/75 transition-opacity"></div>
                </TransitionChild>

                <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to=" translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from=" translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                        <div>
                            <label for="location" class="block text-sm/6 font-medium text-gray-900">Select User</label>
                            <div class="mt-2 grid grid-cols-1">
                                <select v-model="tem_selectd_user" id="location" name="location" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6">
                                <option>---select--</option>
                                <option v-for="(user,index) in clientModel.clients" :value='user' :key="index">{{ user.first_name }} {{  user.last_name }}</option>
                                </select>
                                <ChevronDownIcon class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" aria-hidden="true" />
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button type="button" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2" @click="selected_user = tem_selectd_user; selectclientModel = false">Validate</button>
                            <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0" @click="open = selectclientModel" ref="cancelButtonRef">Cancel</button>
                        </div>
                    </DialogPanel>
                    </TransitionChild>
                </div>
                </div>
            </Dialog>
        </TransitionRoot>


        <TransitionRoot as="template" :show="checkoutPopup">
            <Dialog class="relative z-10" @close="checkoutPopup = false">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="" leave="ease-in duration-200" leave-from="" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500/75 transition-opacity"></div>
                </TransitionChild>

                <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to=" translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from=" translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <DialogPanel v-if='caisseModel.cart.length > 0' class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                        <div class="flex items-center justify-center py-2">
                            <img src="/logo.png" class=" w-[100px] ">
                        </div>
                        <div class="border-b border-gray-200  px-4 sm:px-6 lg:px-8 pb-3">
                            <div class="flex items-center justify-between">
                                <span>Date : </span>
                                <span>{{ now }}</span>
                            </div>
                            <div class="flex items-center justify-between mt-1">
                                <span>Agent : </span>
                                <span >{{ auth.user.first_name }} {{ auth.user.last_name}}</span>
                            </div>
                            <div class="flex items-center justify-between mt-1" v-if="selected_user !== ''">
                                <span>client : </span>
                                <span class="font-semibold">{{  selected_user.first_name }} {{ selected_user.last_name}}</span>
                            </div>
                            <div class="flex items-center justify-between mt-1" v-if='selected_payment_method !== "mixte"'>
                                <span>Payment Method : </span>
                                <span>{{  selected_payment_method }}</span>
                            </div>
                            <div v-else>
                                <div class="flex items-center justify-between mt-1" v-for="(payment,index) in payments" :key='index' >
                                    <span>{{ payment.payment_method }} : </span>
                                    <span>{{ payment.amount }} DH </span>
                                </div>
                            </div>
                        </div>
                        <ul role="list"   class="divide-y divide-gray-200 px-4 sm:px-6 lg:px-8">
                            <li v-for="item in caisseModel.cart" :key="item.product_id" class="flex py-8 text-sm sm:items-center">
                                <div class="grid flex-auto grid-cols-1 grid-rows-1 items-start gap-x-5 gap-y-3  sm:flex sm:items-center sm:gap-0">
                                    
                                    <div class="flex items-center gap-2 ">
                                        
                                        <div>
                                            <h3 class="font-medium text-gray-900">
                                            {{ item.product.name }}
                                            </h3>
                                            <p class="mt-1 mx-4 text-black ">prix : {{ item.price }} DH</p>
                                            <p class="mt-1 mx-4 text-black ">quentity : {{item.quantity}}</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>

                        <div class="border-t border-gray-200">
                            <div class="flex px-4 sm:px-6 lg:px-8 items-center justify-between w-full pt-2">
                                <span class=" font-semibold">Number article : </span>
                                <span class=" font-semibold">{{ caisseModel.cartCount }} DH</span>
                            </div>
                            <div class="flex px-4 sm:px-6 lg:px-8 items-center justify-between w-full mb-2">
                                <span class=" font-semibold">TOTAL : </span>
                                <span class=" font-semibold text-xl">{{ caisseModel.cartTotal }} DH</span>
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button type="button" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2" @click="checkout()">
                                <span v-if="checkoutSubmit" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <Cog6ToothIcon class="h-5 w-5 text-white" aria-hidden="true" />
                                </span>
                                Validate

                            </button>
                            <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-red-900 shadow-xs inset-ring-1 border border-red-700 inset-ring-red-300 hover:bg-red-50 sm:col-start-1 sm:mt-0" @click="checkoutPopup = false" ref="cancelButtonRef">Cancel</button>
                        </div>
                    </DialogPanel>
                    </TransitionChild>
                </div>
                </div>
            </Dialog>
        </TransitionRoot>


         <TransitionRoot as="template" :show="mixtePaymentMethod">
            <Dialog class="relative z-10" @close="mixtePaymentMethod = false">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="" leave="ease-in duration-200" leave-from="" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500/75 transition-opacity"></div>
                </TransitionChild>

                <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to=" translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from=" translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <DialogPanel v-if='caisseModel.cart.length > 0' class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                        <h6 class="text-center text-gray-500">TOTAL</h6>
                        <h1 class=" font-semibold text-3xl text-center">{{caisseModel.cartTotal}} DH</h1>
                        <div class="pt-4 mt-4">
                            <div class="flex gap-2 items-center mb-6" v-for="(payment,index) in payments" :key="index">
                                <div class="relative">
                                    <label for="title" class="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900">Amount</label>
                                    <input type="text" v-model="payment.amount" name="title" id="title" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="Product name" />
                                </div>

                                <div class="relative">
                                    <label for="location" class="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900">Method</label>
                                    <div class=" grid grid-cols-1">
                                        <select v-model="payment.payment_method" id="location" name="location" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6">
                                            <option value="cash" v-if="auth.user.payment_methods.cache">cash</option>
                                            <option value="tpe" v-if="auth.user.payment_methods.tpe">tpe</option> 
                                            <option value="virement" v-if="auth.user.payment_methods.virement">virement</option>
                                            <option value="cheque" v-if='auth.user.payment_methods.cheque'>cheque</option>
                                        </select>
                                        <ChevronDownIcon class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" aria-hidden="true" />
                                    </div>
                                </div>

                                <div class="w-1/5 flex items-end gap-2">
                                    <!-- Add Button -->
                                    <button 
                                        v-if="payments.reduce((sum, item) => { return sum + Number(item.amount);}, 0) < caisseModel.cartTotal"
                                        @click="add()"
                                        class="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-400">
                                        Add
                                    </button>

                                    <!-- Remove Button -->
                                    <button 
                                        v-if="payments.length != 1"
                                        @click="remove()"
                                        class="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-400">
                                        Remove
                                    </button>
                                </div>

                               

                            </div>
                        </div>

                        <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button :disabled="payments.reduce((sum, item) => { return sum + Number(item.amount);}, 0) != caisseModel.cartTotal" :class="{' opacity-40':payments.reduce((sum, item) => { return sum + Number(item.amount);}, 0) != caisseModel.cartTotal}" type="button" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2" @click="payments.reduce((sum, item) => { return sum + Number(item.amount);}, 0) != caisseModel.cartTotal ? false : checkoutPopup = true">
                                <span v-if="checkoutSubmit" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <Cog6ToothIcon class="h-5 w-5 text-white" aria-hidden="true" />
                                </span>
                                Validate

                            </button>
                            <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-red-900 shadow-xs inset-ring-1 border border-red-700 inset-ring-red-300 hover:bg-red-50 sm:col-start-1 sm:mt-0" @click="mixtePaymentMethod = false" ref="cancelButtonRef">Cancel</button>
                        </div>
                    </DialogPanel>
                    </TransitionChild>
                </div>
                </div>
            </Dialog>
        </TransitionRoot>

    </div>


</template>


<script setup>
import { ref,onMounted, watch, computed } from 'vue'

import { useCaisseStore } from "@/stores/backoffice/caisse";
import { useBrandStore } from '@/stores/backoffice/brands'
import { useProductStore } from '@/stores/backoffice/products'
import { useAuthStore } from '@/stores/backoffice/auth'
import { useClientStore } from '@/stores/backoffice/client';
import { useAlertStore } from '@/stores/alert'
    import { Cog6ToothIcon } from '@heroicons/vue/24/outline'

import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon,PlusCircleIcon,HomeIcon } from '@heroicons/vue/16/solid'
import { addMethod } from 'yup';
import { useRouter } from 'vue-router'
 const router = useRouter()

const caisseModel = useCaisseStore()
const brandModel = useBrandStore()
const productModel = useProductStore()
const clientModel = useClientStore()

const selectclientModel = ref(false)

const auth = useAuthStore()
const alertModel = useAlertStore()

const barcode = ref('');
const product_name = ref('');
const brand_id = ref('');
const tem_selectd_user = ref('');
const selected_user = ref('')
const selected_payment_method = ref('');
const checkoutPopup = ref(false)
const mixtePaymentMethod = ref(false)
const now = ref(new Date().toISOString().slice(0, 19).replace('T', ' '))
const checkoutSubmit = ref(false)
const payments = ref([{
    payment_method:'cash',
    amount:0
}])

const add = () => {
    payments.value = [...payments.value,{
        payment_method:'cash',
        amount:0
    }]
}

const remove = (index) => {
    payments.value.splice(index, 1)
}
const Refresh = () => {
    barcode.value = '';
    product_name.value = '';
    brand_id.value = ''
}

onMounted(
    async () => {
        await brandModel.getAll()
        await productModel.getList()
        clientModel.per_page = 100;
        await clientModel.getAll()
    }
)

const filteredProducts = computed(() => {
    return productModel.products.filter(product => {

        const matchBarcode =
            !barcode.value ||
            product.product_code?.toLowerCase().includes(barcode.value)

        const matchName =
            !product_name.value ||
            product.name?.toLowerCase().includes(product_name.value.toLowerCase())

        const matchBrand = 
        
            !brand_id.value ||
            product.brand_id === brand_id.value

        return matchBarcode && matchName && matchBrand
    })
})

const Logout = async () => {
    auth.logout()
};

const checkout =async () => {
    // checkoutPopup.value = false
    checkoutSubmit.value = true
    var payload = {
        payment_method:selected_payment_method.value,
        products:caisseModel.cart,
        total:caisseModel.cartTotal
    }
    if(selected_user.value !== ''){
        payload.user_id = selected_user.value.id
    }

    if(selected_payment_method.value == 'mixte'){
        payload.payments = payments.value
    }

    const reponse = await caisseModel.checkout(payload)

    if(reponse.status){        
        router.push('/backoffice/caisse/print/'+reponse.data.id)
    }

}





</script>
