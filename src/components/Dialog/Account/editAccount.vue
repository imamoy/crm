<template lang="pug">
// 編輯帳戶
v-card
    v-card-title.d-flex.justify-center 修改帳戶
    v-card-text
        v-form(v-model='editAccount.valid' ref='form')
            v-text-field.mb-4(v-model='editAccount.name' label='帳戶名稱' name='name' :rules='editAccount.nameRules' required='required' large='large')
            v-select.no-border(label='類型' v-model='editAccount.type' prepend-icon='mdi-domain' :items='editAccount.typeList' item-text='name' item-value='idx' flat)
            v-select.no-border(label='產業' v-model='editAccount.industry' prepend-icon='mdi-domain' :items='editAccount.industryList' item-text='name' item-value='idx' flat)
            v-file-input.no-border(prepend-icon='mdi-image' label='更新公司LOGO' accept='image/*')
            v-autocomplete.no-border(v-model='editAccount.own' :items='editAccount.ownList' item-text='name' item-value='idx' prepend-icon='mdi-account' label='擁有者')
            v-text-field.no-border(v-model='editAccount.web' prepend-icon='mdi-earth' label='網站')
            v-row(no-gutters='no-gutters')
                v-col(cols='6')
                    v-text-field.no-border(v-model='editAccount.cell' prepend-icon='mdi-phone' label='電話')
                v-col(cols='6')
                    v-text-field.no-border(v-model='editAccount.fax' prepend-icon='mdi-fax' label='傳真')
            v-text-field.no-border(v-model='editAccount.address' prepend-icon='mdi-map' label='地址')
            v-text-field.no-border(v-model='editAccount.peoples' prepend-icon='mdi-account-group' label='員工人數')
    v-card-actions.px-2.py-4
        v-row
            v-col.pr-2(cols='6')
                v-btn(:ripple='false' @click='onCancel' width='100%' height='40' color='cancel' depressed dark) 取消
            v-col.pl-2(cols='6')
                v-btn(:ripple='false' @click='onConfirm' width='100%' height='40' color='primary' depressed dark) 新增
</template>

<script>
	import Vue from 'vue';

	export default Vue.extend({
        props: ['accountData'],
		data() {
			return {
				editAccount: {
                    displayStatus: false,
                    valid: true,
                    logo: '',
                    name: '',
                    nameRules: [v => !!v || '標題為必填'],
                    type: '',
                    typeList: ['無','Analyst','Competitor','Customer','Other'],
                    industry: '',
                    industryList: [
                        { idx: 1, name: '房地產' },
                        { idx: 2, name: '食品業' }
                    ],
                    own: '',
                    ownList: [
                        { idx: 1, name: 'James Campbell' },
                        { idx: 2, name: 'Andy Lu' }
                    ],
                    web: '',
                    cell: '',
                    fax: '',
                    peoples: '',
                    address: '',
                },
			}
		},
        mounted() {
            this.editAccount.name = this.accountData.name;
            this.editAccount.logo = this.accountData.logo;
            this.editAccount.type = this.accountData.type;
            this.editAccount.industry = this.accountData.industry;
            this.editAccount.cell = this.accountData.cell;
            this.editAccount.fax = this.accountData.fax;
            this.editAccount.address = this.accountData.address;
            this.editAccount.own = this.accountData.own;
            this.editAccount.web = this.accountData.web;
            this.editAccount.peoples = this.accountData.peoples;
        },
        methods: {
			validate() {
				this.$refs.form.validate()
			},
			onConfirm() {
				this.$emit('emitEditAccountDialog', true);
			},
			onCancel() {
				this.$emit('emitEditAccountDialog', false);
			},
		}
	});
</script>