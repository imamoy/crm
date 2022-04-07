<template lang="pug">
// 修改聯絡人
v-card
    v-card-title.d-flex.justify-center 修改聯絡人
    v-card-text
        v-form(v-model='valid' ref='form')
            v-text-field.mb-4(v-model='contactData.name' label='聯絡人姓名' name='name' :rules='nameRules' required='required' large='large')
            v-text-field.no-border(v-model='contactData.phone' prepend-icon='mdi-cellphone' label='電話')
            v-row(no-gutters='no-gutters')
                v-col(cols='6')
                    v-text-field.no-border(v-model='contactData.cell' prepend-icon='mdi-phone' label='電話')
                v-col(cols='6')
                    v-text-field.no-border(v-model='contactData.extension' prepend-icon='mdi-pound' label='分機')
            v-text-field.no-border(v-model='contactData.mail' prepend-icon='mdi-mail' label='E-mail')
            v-file-input.no-border(prepend-icon='mdi-image' label='更新聯絡人照片')
            v-combobox.no-border(v-model='contactData.company' :items='companyList' item-text='name' item-value='idx' prepend-icon='mdi-domain' label='公司名稱')
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
            v-text-field.no-border(v-model='contactData.companyWeb' prepend-icon='mdi-earth' label='公司網站')
            v-autocomplete.no-border(v-model='contactData.own' :items='ownList' item-text='name' item-value='idx' prepend-icon='mdi-account' label='擁有者')
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
        props: {
            contactData: {
                type: Object,
                required: true,
            },
        },
        data() {
			return {
                valid: true,
                companyList: [
                    { idx: 1, name: '鉅碩資產', web: 'https://cm2.io/', isNew: true },
                    { idx: 2, name: '可口可樂', web: 'https://coca/', isNew: false }
                ],
                ownList: [
                    { idx: 1, name: 'James Campbell' },
                    { idx: 2, name: 'Andy Lu' }
                ],
                nameRules: [v => !!v || '標題為必填'],
			}
		},
        methods: {
			validate() {
				this.$refs.form.validate()
			},
			onConfirm() {
				this.$emit('emitEditContactDialog', true);
			},
			onCancel() {
				this.$emit('emitEditContactDialog', false);
			},
		}
	});
</script>