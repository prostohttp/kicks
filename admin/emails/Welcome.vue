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
						src="https://pixeldrain.com/api/file/8b2LR8UH"
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
								We are glad to have you on {{ siteName }}!
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
