<template lang="pug">
	// 修改聯絡人
	v-card
		v-card-title.d-flex.justify-center 修改聯絡人資料
		v-card-text
			v-form(v-model='editContactDetail.valid' ref='form')
				v-text-field.mb-2(v-model='editContactDetail.name' label='聯絡人姓名' name='name' :rules='editContactDetail.nameRules' required='required' large='large')
				v-row(no-gutters='no-gutters')
					v-col(cols='6')
						v-text-field.no-border(v-model='editContactDetail.cell' prepend-icon='mdi-phone' label='電話')
					v-col(cols='6')
						v-text-field.no-border(v-model='editContactDetail.extension' prepend-icon='mdi-pound' label='分機')
				v-text-field.no-border(v-model='editContactDetail.mail' prepend-icon='mdi-mail' label='E-mail')
				v-file-input.no-border(prepend-icon='mdi-image' label='更新聯絡人照片')
				hr.mt-5
				v-combobox.no-border(v-model='editContactDetail.company' :items='editContactDetail.companyList' item-text='name' item-value='idx' prepend-icon='mdi-domain' label='公司名稱')
					template(v-slot:selection='data')
						div(v-if='data.item.isNew == true')
							span {{ data.item.name }}
							v-icon(color='red' size='36') icon-new
						div(v-else)
							span {{ data.item.name }}
					template(v-slot:item='data')
						div(v-if='data.item.isNew == true')
							span {{ data.item.name }}
							v-icon(color='red' size='36') icon-new
						div(v-else)
							span {{ data.item.name }}
				v-text-field.no-border(v-model='editContactDetail.companyWeb' prepend-icon='mdi-earth' label='公司網站')
				v-row(no-gutters='no-gutters')
					v-col(cols='6')
						v-text-field.no-border(v-model='editContactDetail.cell' prepend-icon='mdi-phone' label='電話')
					v-col(cols='6')
						v-text-field.no-border(v-model='editContactDetail.fax' prepend-icon='mdi-fax' label='傳真')
				v-autocomplete.no-border(v-model='editContactDetail.own' :items='editContactDetail.ownList' item-text='name' item-value='idx' prepend-icon='mdi-account' label='擁有者')
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
		props: ['contactData'],
		data() {
			return {
				editContactDetail: {
					displayStatus: false,
					valid: true,
					name: '',
					nameRules: [v => !!v || '標題為必填'],
					pic: '',
					phone: '',
					cell: '',
					extension: '',
					mail: '',
					fax: '',
					company: '',
					companyWeb: '',
					companyList: [
						{ idx: 1, name: '鉅碩資產', web: 'https://cm2.io/' },
						{ idx: 2, name: '可口可樂', web: 'https://coca/' }
					],
					own: '',
					ownList: [
						{ idx: 1, name: 'James Campbell' },
						{ idx: 2, name: 'Andy Lu' }
					],
				},
			}
		},
		watch: {
            contactData: function() {
                this.updateData();
            }
        },
		mounted() {
            this.updateData();
        },
		methods: {
			validate() {
				this.$refs.form.validate()
			},
			onConfirm() {
				this.$emit('emitEditContactDetailDialog', true);
			},
			onCancel() {
				this.$emit('emitEditContactDetailDialog', false);
			},
			updateData() {
                this.editContactDetail.name = this.contactData.name;
				this.editContactDetail.pic = this.contactData.pic;
				this.editContactDetail.phone = this.contactData.phone;
				this.editContactDetail.cell = this.contactData.cell;
				this.editContactDetail.extension = this.contactData.extension;
				this.editContactDetail.fax = this.contactData.company.fax;
				this.editContactDetail.mail = this.contactData.mail;
				this.editContactDetail.company = this.contactData.company.name;
				this.editContactDetail.companyWeb = this.contactData.company.web;
				this.editContactDetail.own = this.contactData.ownerName;
            }
		}
	});
</script>