<template>
  <!-- Expert Page -->
  <div class="page">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="12" class="py-0"> <ExpertAvatar /></v-col>
        <v-col cols="12" sm="8" md="6" class="py-0"> <PersonlCard /></v-col>
        <v-col cols="12" sm="8" md="6" class="py-8 py-md-0"> <ProfessionalCard /></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ExpertAvatar from '~/components/experts/ExpertAvatar.vue';
import PersonlCard from '~/components/experts/PersonlCard.vue';
import ProfessionalCard from '~/components/experts/ProfessionalCard.vue';
export default {
  components: {
    ExpertAvatar,
    PersonlCard,
    ProfessionalCard,
  },

  head() {
    return {
      title: 'Erxa | Expert Profile',
    };
  },
};
</script>
