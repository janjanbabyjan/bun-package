<template>
  <!-- -----------------------------------------------
          Start Footer
    ----------------------------------------------- -->
  <v-footer class="footer px-0">
    <v-container>
      <v-row class="py-6 py-sm-7">
        <!-- -----------------------------------------------
          First Column
        ----------------------------------------------- -->
        <v-col cols="12" md="4" sm="8" class="px-xs-0">
          <h4 class="font-weight-medium mb-5 text-h6">Address</h4>
          <p class="mt-5 text-muted">Digix Technology Co.,Ltd.
            11/8 Sritatprachasanti Rd.
            T.Naimuang,
            Muang Khon Kaen
            Khon Kaen 40000</p>
        </v-col>
        <!-- -----------------------------------------------
          Second Column
        ----------------------------------------------- -->
        <v-col cols="12" md="4" sm="8" class="px-xs-0">
          <h4 class="font-weight-medium mb-5 text-h6">Phone</h4>
          <p class="mt-5 text-muted">Reception : +205 123 4567</p>
          <p class="text-muted">Office : +207 235 7890</p>
        </v-col>
        <!-- -----------------------------------------------
          Third Column
        ----------------------------------------------- -->
        <v-col cols="12" md="4" sm="8" class="px-xs-0">
          <h4 class="font-weight-medium mb-5 text-h6">Email</h4>
          <p class="mt-5 text-muted">
            Office : <NuxtLink class="text-dark text-decoration-none" to="mailto:info@adminmart.com">info@adminmart.com
            </NuxtLink>
          </p>
          <p>
            <span class="text-muted">Site : </span>
            <NuxtLink class="text-dark text-decoration-none" href="https://digix.co.th/">Digix Technology Co.,Ltd.
            </NuxtLink>
          </p>
        </v-col>
        <!-- -----------------------------------------------
          Fourth Column
        ----------------------------------------------- -->

      </v-row>

      <div class="footer-bottom-bar mt-sm-5 mt-0 font-14 ml-sm-0 ml-n3">
        <div class="d-block d-sm-flex align-center">
          <p class="text-muted mb-sm-0 mb-3">
            All Rights Reserved by
            <NuxtLink to="https://digix.co.th//" class="text-muted text-decoration-none">digix.co.th</NuxtLink>
          </p>
        </div>
      </div>
    </v-container>
  </v-footer>
  <!-- -----------------------------------------------
          End Footer
    ----------------------------------------------- -->
</template>


<style src="/assets/scss/layout/_public_footer.scss" scoped></style>