<script lang="ts" setup>
defineProps({
    name: {
        type: String,
    },
    siteName: {
        type: String,
    },
    siteUrl: {
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
        <EPreview>{{ siteName }} recent register</EPreview>
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
                        src="https://vue-email-demo.vercel.app/static/yelp-header.png"
                        width="620"
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
                                    font-size: 32px;
                                    font-weight: bold;
                                    text-align: center;
                                    margin-top: 20px;
                                "
                            >
                                Hi, {{ name }}
                            </EHeading>
                            <EHeading
                                :style="{
                                    fontSize: '26px',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                }"
                                as="h2"
                            >
                                We are glad to have you on {{ siteName }}!
                            </EHeading>

                            <EText :style="paragraph">
                                If this was you, there's nothing else you need
                                to do.
                            </EText>
                            <EText :style="{ ...paragraph, marginTop: '-5px' }">
                                If this wasn't you or if you have additional
                                questions, please see our support page.
                            </EText>
                        </EColumn>
                    </ERow>
                    <ERow :style="{ ...boxInfos, paddingTop: '0' }">
                        <EColumn :style="containerButton" col-span="{2}">
                            <EText :style="button">
                                <a :href="siteUrl" style="color: white"
                                    >Learn More</a
                                >
                            </EText>
                        </EColumn>
                    </ERow>
                </ESection>

                <ESection :style="containerImageFooter">
                    <EImg
                        src="https://vue-email-demo.vercel.app/static/yelp-footer.png"
                        width="620"
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
