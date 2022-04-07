<template lang="pug">
    v-card
        v-col.d-flex.align-center.pa-5.pb-0
            v-row(no-gutters)
                v-col(cols='7')
                    div.d-flex.align-center
                        h2.my-0 聯絡人
                        v-btn.ml-3.add-deal-btn(@click='showAddContact' width='34' height='34' min-width='34' :ripple='false' color='success' depressed dark fab)
                            v-icon(size='16') icon-add
                v-col.text-right(cols='4')
                    .btn-group.ml-auto.mr-2
                        v-text-field(v-model='searchMainContact' flat dense solo prepend-inner-icon='icon-search')
                v-col.text-right(cols='1')
                    v-btn.ml-auto(:ripple='false' @click='onCancel' depressed='depressed' icon)
                        v-icon icon-cancel
        v-card-text.pt-4.px-5.pb-5
            .data-area
                v-data-table.border-table(:headers="mainContactHeader" :items="mainContactData" :items-per-page='mainContactItemPerPage' :page.sync='mainContactPage' :search="searchMainContact" @page-count='mainContactPageCount = $event'  hide-default-footer='hide-default-footer')
                    template(v-slot:item.name='{ item }')
                        a(href='/Contact') {{ item.name }}
                    template(v-slot:item.main='{ item }')
                        v-checkbox(v-model='item.main')
                    template(v-slot:item.tel='{ item }')
                        v-btn(:href='onCall(item.tel)' color='primary' text) {{ item.tel }}
                    template(v-slot:item.mail='{ item }')
                        v-btn(:href='onMall(item.mail)' color='primary' text) {{ item.mail }}
                    template(v-slot:item.account='{ item }')
                        a.t-black(href='/Account') {{ item.account }}
                    template(v-slot:item.active='{ item }')
                        v-btn(icon='icon' @click='onDelete()')
                            v-icon(size='18') icon-remove
                v-pagination.mt-3(v-model='mainContactPage' :length='mainContactPageCount' circle='circle')
        v-dialog(v-model='addContactDialog' max-width='500' persistent)
            add-contact(@emitAddContactDialog='onEmitAddContactDialog')
        v-dialog(v-model='successDialog' width='360' persistent content-class='statusDialog')
            success-dialog(@emitSuccessDialog='onEmitSuccessDialog')
        v-dialog(v-model='messageDialog' width='360' persistent content-class='statusDialog')
            message-dialog(@emitMessageDialog='onEmitMessageDialog' :message='message')
</template>

<script>
	import Vue from 'vue';
    import addContact from '@/components/Dialog/Contact/addContact';
    import messageDialog from '@/components/Dialog/messageDialog';
	import successDialog from '@/components/Dialog/successDialog';

	export default Vue.extend({
        components: {
			addContact,
            successDialog,
            messageDialog
		},
        data() {
			return {
                searchMainContact: '',
                mainContactHeader: [
                    { text: '聯絡人姓名', value: 'name', width: 140 , align: 'center', filterable: true},
                    { text: '職稱', value: 'job', align: 'center', width: 120, filterable: false },
                    { text: '主要', value: 'main', align: 'center', sortable: false, filterable: false },
                    { text: '電話', value: 'tel', align: 'center', filterable: false },
                    { text: '電子郵件', value: 'mail', align: 'center', filterable: false },
                    { text: '帳戶名稱', value: 'account', align: 'center', filterable: true, width: 120 },
                    { text: '執行', value: 'active', align: 'center', sortable: false },
                ],
                mainContactData: [
                    { name: 'Andy', job: 'CEO', main: true, tel: '0900-000-000', mail: 'kay000@gmail.com', account: '鉅碩資產'},
                    { name: 'Kay', job: 'CEO', main: true, tel: '0900-000-000', mail: 'kay000@gmail.com', account: '鉅碩資產'},
                    { name: 'Kelly', job: 'CEO', main: true, tel: '0900-000-000', mail: 'kay000@gmail.com', account: '鉅碩資產'},
                    { name: 'Mia', job: 'CEO', main: true, tel: '0900-000-000', mail: 'kay000@gmail.com', account: '鉅碩資產'},
                ],
                mainContactPage: 1,
                mainContactPageCount: 0,
                mainContactItemPerPage: 10,
                addContactDialog: false,
                successDialog: false,
                messageDialog: false,
                message: '',
			}
		},
        methods: {
			validate() {
				this.$refs.form.validate()
			},
			onCancel() {
				this.$emit('emitMainContactsDialog', false);
			},
            // Common Function
            onCall: function (cell) {
                return 'tel:'+cell;
            },
            onMall: function (mail) {
                return 'mailto:'+mail;
            },
            showSussessDialog() {
                this.successDialog = true;
            },
            onEmitSuccessDialog() {
                this.successDialog = false;
            },
            showAddContact() {
                this.addContactDialog = true;
            },
            onEmitAddContactDialog(val) {
                this.addContactDialog = false;
                if (val) {
                    this.showSussessDialog();
                }
            },
            showMessageDialog(message) {
                this.messageDialog = true;
                this.message = message;
            },
            onEmitMessageDialog(val) {
                this.messageDialog = false;
                if (val) { this.successDialog = true; }
            },
            onDelete () {
                this.showMessageDialog('您確定要刪除此聯絡人嗎？');
            },
		}
	});
</script>