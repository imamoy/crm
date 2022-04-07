<template>
	<div class="height_100 py-4 py-md-7" id="menu-bar">
		<div class="top">
			<div class="d-flex justify-center align-center mb-4">
				<div class="logo mx-auto"><img src="../assets/images/logo.png" /></div>
			</div>
			<v-list class="nav" :class="isToggle ? 'is-active' : ''">
				<div v-for="item in menuRouters" :key="item.name">
					<v-list-item class="mb-2" v-if="item.path !== '/Deal'" >
						<v-tooltip right="right">
							<template v-slot:activator="{ on, attrs }">
								<v-btn class="nav-btn mx-auto" :to="item.path" @click="isToggle = false" :ripple="false" :draggable="false" v-bind="attrs" v-on="on" :icon="!isMobile" depressed>
									<v-icon v-if="checkLink(item.path)" size="23">{{ item.active }}</v-icon>
									<v-icon v-else size="23">{{ item.normal }}</v-icon>
									<span v-if="isMobile">{{ item.name }}</span>
								</v-btn>
							</template><span>{{ item.name }}</span>
						</v-tooltip>
					</v-list-item>
				</div>
			</v-list>
		</div>
		<div class="bottom">
			<v-btn class="hamburger" v-if="isMobile" @click="toggleMenu" :class="isToggle ? 'is-active' : ''" :ripple="false" :draggable="false" width="50" min-width="50" depressed>
				<span class="line"></span>
				<span class="line"></span>
				<span class="line"></span>
			</v-btn>
			<v-menu top="top" :offset-x="offset" nudge-right="18">
				<template v-slot:activator="{ on, attrs }">
					<v-avatar color="aliceBlue" v-bind="attrs" v-on="on"><span
							v-if="member.pic === ''">{{ member.nickname }}</span><img v-else :src="member.pic"
							:alt="member.name" /></v-avatar>
				</template>
				<v-list class="pa-0">
					<v-list-item-title class="pa-4">{{ member.name }}</v-list-item-title>
					<v-list-item class="text-center" @click="onlogout()">登出</v-list-item>
				</v-list>
			</v-menu>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'MenuBar',
		data() {
			return {
				menuRouters: [
					{
						path: '/',
						name: 'Home',
						normal: 'icon-home-border',
						active: 'icon-home'
					},
					{
						path: '/Dashboard',
						name: 'Dashboard',
						normal: 'icon-dashboard-border',
						active: 'icon-dashboard',
					},
					{
						path: '/Deals',
						name: 'Deals',
						normal: 'icon-chatmoney-border',
						active: 'icon-chatmoney',
					},
					{
						path: '/Contacts',
						name: 'Contacts',
						normal: 'icon-contact-border',
						active: 'icon-contact',
					},
					{
						path: '/Companies',
						name: 'Companies',
						normal: 'icon-companies-w',
						active: 'icon-companies-b',
					},
					{
						path: '/Setting',
						name: 'Setting',
						normal: 'icon-setting-w',
						active: 'icon-setting-b',
					},
				],
				member: {
					name: 'John Wu',
					pic: '',
					nickname: 'JW',
				},
				offset: true,
				isMobile: false,
				isToggle: false,
			};
		},
		watch: {
			menuToggle(e) {
				console.log(e);
			}
		},
		mounted() {
			this.onResize();
		},
		methods: {
			checkLink: function (itemLink) {
				const windowsHref = this.$route.path;
				if (itemLink === windowsHref) {
					return true;
				} else {
					return false;
				}
			},
			onlogout() {
				window.location.reload();
			},
			onResize: function () {
				if (window.innerWidth < 767) {
					this.isMobile = true;
				}
			},
			toggleMenu() {
				if (this.isToggle == false) {
					this.isToggle = true;
				} else {
					this.isToggle = false;
				}
			}

		}
	}
</script>