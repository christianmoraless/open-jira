import Head from "next/head";
import { Inter } from "next/font/google";
import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { Layout } from "@/components";
import { EntryList, NewEntry } from "@/components/ui";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout title="Home - OpenJira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Pending" />
            <CardContent>
              <NewEntry />
              <EntryList status="pending" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="In Progress" />
            <CardContent>
              <EntryList status="in-progress" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Completed" />
            <CardContent>
              <EntryList status="finished" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
