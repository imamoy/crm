<template lang="pug">
v-card.dealDialog
    v-card-title.d-flex.justify-center 變更擁有者
    v-card-text
        v-form(v-model='changeOwnValid' ref='form')
            v-autocomplete.mt-4(v-model='own' :items='people' item-text='name' item-value='name' rounded solo prepend-inner-icon='mdi mdi-account')
                template(v-slot:item='data')
                    template(v-if="data.item !== 'object'")
                        v-list-item-content(v-text='data.item.name')
                    template(v-else)
                        v-list-item-avatar.mr-2
                            img(:src='data.item.pic')
                        v-list-item-content
                            v-list-item-title(v-html='data.item.name')
    v-card-actions.px-2.py-4
        v-row
            v-col.pr-2(cols='6')
                v-btn(:ripple='false' @click='onCancel' width='100%' height='40' color='cancel' depressed dark) 取消
            v-col.pl-2(cols='6')
                v-btn(:ripple='false' @click='onConfirm' width='100%' height='40' color='success' depressed dark) 新增
</template>

<script>
	import Vue from 'vue';

	export default Vue.extend({
        data() {
			return {
                changeOwnValid: true,
                own: 'James Campbell',
                people: [
                    { name: 'James Campbell', pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR8zBnWt2f48y_tUcLks0aMS14C1da4qOBjw&usqp=CAU'},
                    { name: 'Sunny Chen', pic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=707b9c33066bf8808c934c8ab394dff6'},
                    { name: 'Jason Lu', pic: 'https://cdn.vuetifyjs.com/images/john.jpg'},
                    { name: 'Mandy Wang', pic: 'data:image/jpeg;base64,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'},
                ],
			}
		},
        methods: {
			validate() {
				this.$refs.form.validate()
			},
			onConfirm() {
				this.$emit('emitChangeOwnDialog', true);
			},
			onCancel() {
				this.$emit('emitChangeOwnDialog', false);
			},
		}
	});
</script>