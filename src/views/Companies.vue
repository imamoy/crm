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
                        logo: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.104.com.tw%2Fb_profile%2Fcust_picture%2F9368%2F130000000129368%2Flogo.png&imgrefurl=https%3A%2F%2Fwww.104.com.tw%2Fcompany%2F1a2x6bkr4o&tbnid=szFsgzDsqOpGtM&vet=12ahUKEwjFsYbNiNzzAhVlGKYKHS3_CEIQMygBegQIARAx..i&docid=sjDxjGojOdoRRM&w=140&h=126&q=%E9%89%85%E7%A2%A9%E8%B3%87%E7%94%A2&ved=2ahUKEwjFsYbNiNzzAhVlGKYKHS3_CEIQMygBegQIARAx',
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