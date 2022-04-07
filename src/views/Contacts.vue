<template lang='pug'>
	#Contacts.main-page.page-noScroll.pb-0
		v-row#page-head.d-flex.align-center.justify-md-space-between
			v-col.d-flex.align-center.px-0.pb-0.px-md-2.pb-md-4(cols='4' md='6' lg='8')
				h1.my-0 Contacts
				v-btn.ml-3.edit-deal-btn(@click='showAddContact' width='40' height='40' :ripple='false' color='success' depressed dark fab)
					v-icon(size='16') icon-add
			v-col(cols='12' md='6' lg='4')
				v-row.justify-md-end(no-gutters='no-gutters')
					v-col(cols='auto')
						.btn-group
							v-btn(@click='onCopy()' width='80' height='38' color='white' depressed tile dark)
								v-icon(size='16') icon-edit
								span 複製
							v-btn.border-left(@click='onDelete()' width='80' height='38' color='white' depressed tile dark)
								v-icon(size='16') icon-remove
								span 刪除
					v-col.ml-4
						.btn-group
							v-text-field(v-model='searchContact' flat dense solo prepend-inner-icon='icon-search')
		#page-inner.scroll-x.pt-md-6.pb-0
			.data-area
				v-data-table(class='deals-table height_100' :headers='contactHeader' :items='contactData' :search='searchContact' :items-per-page='itemPerPage' :page.sync='page' @page-count='pageCount = $event' height='100%' hide-default-footer='hide-default-footer' show-select item-key='name')
					template(v-slot:item.name='{ item }')
						v-list-item-avatar.ma-0.ml-3(color='aliceBlue' size='40')
							v-icon(v-if="item.pic === ''") mdi-account
							img(v-else='' :src='item.pic')
						v-btn(href='/Contact' color='black' text) {{ item.name }}
					template(v-slot:item.company='{ item }')
						a.t-black(href='/Account') {{ item.company }}
					template(v-slot:item.phone='{ item }')
						v-btn(:href='onCall(item.phone)' color='primary' text) {{ item.phone }}
					template(v-slot:item.mail='{ item }')
						v-btn(:href='onMall(item.mail)' color='primary' text) {{ item.mail }}
					template(v-slot:item.own='{ item }')
						a.t-black(href='/Account') {{ item.own }}
					template(v-slot:item.active='{ item }')
						v-btn(icon='icon' @click='showEditContact(item)')
							v-icon(size='18') icon-edit
						v-btn(icon='icon' @click='onDelete')
							v-icon(size='18') icon-remove
				v-pagination.py-1.mb-3(v-model='page' :length='pageCount')
		v-dialog(v-model='addContactDialog' max-width='500' persistent)
			add-contact(@emitAddContactDialog='onEmitAddContactDialog')
		v-dialog(v-model='editContactDialog' max-width='500' persistent)
			edit-contact(@emitEditContactDialog='onEmitEditContactDialog' :contact-data='edtorContactData')
		v-dialog(v-model='messageDialog' width='360' persistent content-class='statusDialog')
			message-dialog(@emitMessageDialog='onEmitMessageDialog' :message='message')
		v-dialog(v-model='successDialog' width='360' persistent content-class='statusDialog')
			success-dialog(@emitSuccessDialog='onEmitSuccessDialog')
		v-dialog(v-model='errorDialog' width='360' persistent content-class='statusDialog')
			error-dialog(@emitErrorDialog='onEmitErrorDialog' :errorMessage='errorMessage')
</template>

<script>
	import addContact from '@/components/Dialog/Contact/addContact';
	import editContact from '@/components/Dialog/Contact/editContact';
	import messageDialog from '@/components/Dialog/messageDialog';
	import successDialog from '@/components/Dialog/successDialog';
	import errorDialog from '@/components/Dialog/errorDialog';

	export default {
		components: {
			addContact,
			editContact,
			messageDialog,
			successDialog,
			errorDialog
		},
		data() {
			return {
				// table setting
				page: 1,
				pageCount: 0,
				itemPerPage: 12,
				// Contact Table Data
				searchContact: '',
				contactHeader: [
					{
						text: '聯絡人姓名',
						value: 'name',
						align: 'left',
					},
					{
						text: '公司名稱',
						value: 'company',
						align: 'center',
						width: 200
					},
					{
						text: '聯絡電話',
						value: 'phone',
						align: 'center'
					},
					{
						text: '電子郵件',
						value: 'mail',
						align: 'center'
					},
					{
						text: '擁有者',
						value: 'own',
						align: 'center'
					},
					{
						text: '執行',
						value: 'active',
						align: 'center',
						width: 200
					},
				],
				contactData: [
					{
						idx: 1,
						name: 'Andy Lu',
						pic: 'https://cdn.vuetifyjs.com/images/john.jpg',
						cell: '02-0000-0000',
						extension: '#123',
						phone: '0900-000-000',
						mail: 'andy@cm2.io',
						company: '鉅碩資產',
						companyWeb: 'https://cm2.io/',
						own: 'Andy Lu',
					},
					{
						idx: 2,
						name: 'JC',
						pic: '',
						cell: '02-0000-0000',
						extension: '#123',
						phone: '0900-000-000',
						mail: 'jc@coke.com.tw',
						company: '可口可樂',
						companyWeb: '',
						own: 'Andy Lu',
					},
				],
				// Dialog
				messageDialog: false,
				message: '',
				successDialog: false,
				successMessage: '',
				errorDialog: false,
				errorMessage: '',
				addContactDialog: false,
				editContactDialog: false,
				edtorContactData: {},
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
			showAddContact() {
				this.addContactDialog = true;
			},
			onEmitAddContactDialog(val) {
				this.addContactDialog = false;
				if (val) {
					this.showSussessDialog('您已新增一筆行程');
				}
			},
			showEditContact(data) {
				this.editContactDialog = true;
				// insert data
				this.edtorContactData = data;
			},
			onEmitEditContactDialog(val) {
				this.editContactDialog = false;
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
				if (val) { console.log('如果確認 執行'); }
			},
			onCopy: function() {
				this.showMessageDialog('您確定要複製此資料嗎？');
			},
			// Dialog Area ----------------------------------------- [End]
		},
	}
</script>