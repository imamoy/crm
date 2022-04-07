<template lang='pug'>
    #Companies.main-page.page-noScroll.pb-0
        v-row#page-head.d-flex.align-center.justify-md-space-between
            v-col.d-flex.align-center.px-0.pb-0.px-md-2.pb-md-4(cols='4' md='6' lg='8')
                h1.my-0 Companies
                v-btn.ml-3.add-deal-btn(@click='showAddAccount' width='40' height='40' :ripple='false' color='success' depressed dark fab)
                    v-icon(size='16') icon-add
            v-col(cols='12' md='6' lg='4')
                v-row.justify-md-end(no-gutters='no-gutters')
                    v-col(cols='auto')
                        .btn-group
                            v-btn(@click='onCopy()  ' width='80' height='38' color='white' depressed tile dark)
                                v-icon(size='16') icon-edit
                                span 複製
                            v-btn.border-left(@click='onDelete()' width='80' height='38' color='white' depressed tile dark)
                                v-icon(size='16') icon-remove
                                span 刪除
                    v-col.ml-4
                        .btn-group
                            v-text-field(v-model='searchAccount' flat dense solo prepend-inner-icon='icon-search')
        #page-inner.scroll-x.pt-md-6.pb-0
            .data-area
                v-data-table(class='deals-table height_100' :headers='accountHeader' :items='accountData' :search='searchAccount' :items-per-page='itemPerPage' :page.sync='page' @page-count='pageCount = $event' height='100%' hide-default-footer='hide-default-footer' show-select item-key='name')
                    template(v-slot:item.name='{ item }')
                        v-list-item-avatar.ma-0.ml-3(color='aliceBlue' size='40')
                            v-icon(v-if="item.logo === ''") mdi-domain
                            img(v-else='' :src='item.logo' :alt='item.name')
                        v-btn(href='/Account' color='black' text) {{ item.name }}
                    template(v-slot:item.cell='{ item }')
                        v-btn(:href='onCall(item.cell)' color='primary' text) {{ item.cell }}
                    template(v-slot:item.address='{ item }')
                        v-btn(:href='onGoogleMap(item.address)' color='primary' text) {{ item.address }}
                    template(v-slot:item.own='{ item }')
                        a.t-primary(href='/Account') {{ item.own }}
                    template(v-slot:item.active='{ item }')
                        v-btn(icon='icon' @click='showEditAccount(item)')
                            v-icon(size='18') icon-edit
                        v-btn(icon='icon' :href='item.web' target="_blank")
                            v-icon(size='22') mdi mdi-earth
                        v-btn(icon='icon' @click='onDelete()')
                            v-icon(size='18') icon-remove
                v-pagination.py-1.mb-3(v-model='page' :length='pageCount' circle)
        v-dialog(v-model='addAccountDialog' max-width='500' persistent)
            add-account(@emitAddAccountDialog='onEmitAddAccountDialog')
        v-dialog(v-model='editAccountDialog' max-width='500' persistent)
            edit-account(@emitEditAccountDialog='onEmitEditAccountDialog' :account-data='edtorAccountData')
        v-dialog(v-model='messageDialog' width='360' persistent content-class='statusDialog')
            message-dialog(@emitMessageDialog='onEmitMessageDialog' :message='message')
        v-dialog(v-model='successDialog' width='360' persistent content-class='statusDialog')
            success-dialog(@emitSuccessDialog='onEmitSuccessDialog')
        v-dialog(v-model='errorDialog' width='360' persistent content-class='statusDialog')
            error-dialog(@emitErrorDialog='onEmitErrorDialog' :errorMessage='errorMessage')
</template>

<script>
    import addAccount from '@/components/Dialog/Account/addAccount';
	import editAccount from '@/components/Dialog/Account/editAccount';
	import messageDialog from '@/components/Dialog/messageDialog';
	import successDialog from '@/components/Dialog/successDialog';
	import errorDialog from '@/components/Dialog/errorDialog';

	export default {
		components: {
			addAccount,
			editAccount,
			messageDialog,
			successDialog,
			errorDialog
		},
        data() {
            return {
                // Table Setting
                page: 1,
                pageCount: 0,
                itemPerPage: 12,
                // Account Table Data
                searchAccount: '',
                accountHeader: [
                    {
                        text: '帳戶名稱',
                        value: 'name',
                        align: 'left',
                    },
                    {
                        text: '電話',
                        value: 'cell',
                        align: 'center'
                    },
                    {
                        text: '地址',
                        value: 'address',
                        align: 'center'
                    },
                    {
                        text: '類型',
                        value: 'type',
                        align: 'center',
                        width: 120
                    },
                    {
                        text: '行業別',
                        value: 'industry',
                        align: 'center',
                        width: 120
                    },
                    {
                        text: '擁有者',
                        value: 'own',
                        align: 'center',
                        width: 120
                    },
                    {
                        text: '執行',
                        value: 'active',
                        align: 'center',
                        width: 200
                    },
                ],
                accountData: [
                    {
                        idx: 1,
                        name: '鉅碩資產',
                        logo: 'data:image/jpeg;base64,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',
                        type: 'Analyst',
                        industry: '房地產',
                        cell: '02-0000-0000',
                        fax: '',
                        address: '台北市中正區大有路333號10F',
                        own: 'Andy Lu',
                        web: 'https://cm2.io/',
                        peoples: 50,
                    },
                    {
                        idx: 2,
                        name: '可口可樂',
                        logo: 'https://www.coke.com.tw/content/dam/brands/tw/coca-cola/image/coke-logo.png',
                        type: 'food',
                        industry: '食品業',
                        cell: '02-0000-0000',
                        fax: '',
                        address: '台北市中正區大有路333號10F',
                        own: 'Andy Lu',
                        web: '',
                        peoples: 50,
                    },
                ],
                // Dialog
				messageDialog: false,
				message: '',
				successDialog: false,
				successMessage: '',
				errorDialog: false,
				errorMessage: '',
				addAccountDialog: false,
				editAccountDialog: false,
				edtorAccountData: {},
            }
        },
        mounted() {
            this.onResize();
        },
        methods: {
            onResize: function () {
                if (window.innerWidth > 1901) {
                    this.itemPerPage = 12;
                } else if (window.innerWidth > 1600 && window.innerWidth < 1900) {
                    this.itemPerPage = 11;
                } else if (window.innerWidth < 1590) {
                    this.itemPerPage = 9;
                } else if (window.innerWidth < 767) {
                    this.isMobile = true;
                }
            },
            onCall: function (cell) {
                return 'tel:'+cell;
            },
            onMall: function (mail) {
                return 'mailto:'+mail;
            },
            onGoogleMap: function(address){
                return 'https://www.google.com.tw/maps/place/'+address;
            },
            // Dialog Area ----------------------------------------- [Start]
            showAddAccount() {
				this.addAccountDialog = true;
			},
			onEmitAddAccountDialog(val) {
				this.addAccountDialog = false;
				if (val) {
					this.showSussessDialog('您已新增一筆行程');
				}
			},
			showEditAccount(data) {
				this.editAccountDialog = true;
				// insert data
				this.edtorAccountData = {
					name: data.name,
					pic: data.pic,
					phone: data.phone,
					cell: data.cell,
					extension: data.extension,
					mail: data.mail,
					company: data.company,
					companyWeb: data.companyWeb,
					own: data.own,
				}
			},
			onEmitEditAccountDialog(val) {
				this.editAccountDialog = false;
				if (val) {
					this.showSussessDialog();
				}
			},
			// Message Dialog
			onDelete () {
				this.showMessageDialog('您確定要刪除此工作嗎？');
			},
			showMessageDialog(message) {
				this.messageDialog = true;
				this.message = message;
			},
			onEmitMessageDialog(val) {
				this.messageDialog = false;
				if (val) { this.showSussessDialog(); }
			},
			showSussessDialog() {
				this.successDialog = true;
			},
			onEmitSuccessDialog() {
				this.successDialog = false;
			},
			showErrorDialog(message) {
				this.errorDialog = true;
				this.errorMessage = message;
			},
			onEmitErrorDialog(val) {
				this.errorMessage = false;
				if (val) { ('如果確認 執行console.log'); }
			},
			onCopy: function() {
				this.showMessageDialog('您確定要複製此資料嗎？');
			}
            // Dialog Area ----------------------------------------- [End]
        },
    }
</script>