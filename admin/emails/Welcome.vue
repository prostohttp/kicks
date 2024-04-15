<script lang="ts" setup>
	defineProps({
		userFirstName: {
			type: String,
			default: "John",
		},
		userLastName: {
			type: String,
			default: "Doe",
		},
		siteName: {
			type: String,
			default: "Kicks Club",
		},
		siteUrl: {
			type: String,
			default: "http://localhost:3001",
		},
	});

	const main = {
		backgroundColor: "#fff",
		fontFamily:
			'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
	};

	const link = {
		color: "#4A69E2",
	};

	const paragraph = {
		fontSize: "16px",
	};

	const logo = {
		padding: "30px 20px",
	};

	const containerButton = {
		display: "flex",
		justifyContent: "center",
		width: "100%",
	};

	const button = {
		backgroundColor: "#e00707",
		padding: "12px 30px",
		borderRadius: 3,
		color: "#FFF",
		fontWeight: "bold",
		border: "1px solid rgb(0,0,0, 0.1)",
		cursor: "pointer",
	};

	const content = {
		border: "1px solid rgb(0,0,0, 0.1)",
		borderRadius: "3px",
		overflow: "hidden",
	};

	const boxInfos = {
		padding: "20px 40px",
	};

	const containerImageFooter = {
		padding: "45px 0 0 0",
	};
</script>

<template>
	<EHtml>
		<EHead />
		<EPreview>{{ siteName }} recent login</EPreview>
		<EBody :style="main">
			<EContainer>
				<ESection :style="logo">
					<EImg
						src="https://s168vlx.storage.yandex.net/rdisk/cd1b84da0de7b5c97fb8407ecff65a95fa6b54d0e840cefe34009af394fc5fbf/661d20c1/5sFCdr_IOmrzpp9ifm4wjWXAlq2flBr2RR-zY2BqREs9BbydP9Z-7nz_GWwc_u8pha3LiUiii46AmCxGyK7oJQ==?uid=0&filename=small-logo.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&fsize=7767&hid=5a5389fdf5fba9d1222d555dce278307&media_type=image&tknv=v2&etag=3c54762eb42dd90cb9082ea2b5940851&ts=61621f508f240&s=33e60f19171f49219c22fc5f9f4733cdfc886d3766c8eda2482dc69c2d47e8e0&pb=U2FsdGVkX18OyJnAbIbXpoPhFq4N_GcOT-1VUaufmpzWCBQdHQsbR-qrhe1RmAYz98DTgeWnjzMey8e0fUGOn_bGdJYTZz04UNNAtcVAmuc"
						style="width: 100px; padding-top: 5px; padding-bottom: 5px"
					/>
				</ESection>

				<ESection :style="content">
					<EImg
						width="620"
						src="https://vue-email-demo.vercel.app/static/yelp-header.png"
					/>

					<ERow
						:style="{
							...boxInfos,
							paddingBottom: 0,
						}"
					>
						<EColumn>
							<EHeading
								style="
									font-size: 32;
									font-weight: bold;
									text-align: center;
									margin-top: 20px;
								"
							>
								Hi {{ userFirstName }} {{ userLastName }},
							</EHeading>
							<EHeading
								as="h2"
								:style="{
									fontSize: '26px',
									fontWeight: 'bold',
									textAlign: 'center',
								}"
							>
								We noticed a recent login to your account.
							</EHeading>

							<EText :style="paragraph">
								If this was you, there's nothing else you need to do.
							</EText>
							<EText :style="{ ...paragraph, marginTop: '-5px' }">
								If this wasn't you or if you have additional questions, please
								see our support page.
							</EText>
						</EColumn>
					</ERow>
					<ERow :style="{ ...boxInfos, paddingTop: '0' }">
						<EColumn :style="containerButton" col-span="{2}">
							<EText :style="button">
								<NuxtLink :to="siteUrl">Learn More</NuxtLink>
							</EText>
						</EColumn>
					</ERow>
				</ESection>

				<ESection :style="containerImageFooter">
					<EImg
						width="620"
						src="https://vue-email-demo.vercel.app/static/yelp-footer.png"
					/>
				</ESection>

				<EText
					:style="{
						textAlign: 'center',
						fontSize: 12,
						color: 'rgb(0,0,0, 0.7)',
					}"
				>
					&copy; {{ new Date().getFullYear() }} | {{ siteName }} |
					<NuxtLink :to="siteUrl" :style="{ ...link, fontWeight: '600' }">
						www.kicks-club.com
					</NuxtLink>
				</EText>
			</EContainer>
		</EBody>
	</EHtml>
</template>
