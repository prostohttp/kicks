<script lang="ts" setup>
defineProps({
    siteName: {
        type: String,
    },
    siteUrl: {
        type: String,
    },
    token: {
        type: String,
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
        <EPreview>{{ siteName }} - reset the password</EPreview>
        <EBody :style="main">
            <EContainer>
                <ESection :style="logo">
                    <EImg
                        src="https://i.ibb.co/M9NY9c7/small-logo.png"
                        style="
                            width: 100px;
                            padding-top: 5px;
                            padding-bottom: 5px;
                        "
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
                                as="h2"
                                :style="{
                                    fontSize: '26px',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    marginTop: '10px',
                                }"
                            >
                                {{ siteName }}
                            </EHeading>

                            <EText :style="paragraph">
                                If you have not requested a password reset,
                                simply ignore this email.
                            </EText>
                        </EColumn>
                    </ERow>
                    <ERow :style="{ ...boxInfos, paddingTop: '0' }">
                        <EColumn :style="containerButton" col-span="{2}">
                            <EText :style="button">
                                <a style="color: white" :href="token"
                                    >Reset the password</a
                                >
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
                    <a :href="siteUrl" :style="{ ...link, fontWeight: '600' }">
                        www.kicks-club.com
                    </a>
                </EText>
            </EContainer>
        </EBody>
    </EHtml>
</template>
