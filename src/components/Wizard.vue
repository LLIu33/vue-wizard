<template>
  <form-wizard @on-complete="onComplete"
              color="gray"
              error-color="#a94442"
              >
    <tab-content title="Personal details"
                  icon="ti-user" :before-change="validateFirstTab">
      <vue-form-generator :model="model"
                  :schema="firstTabSchema"
                  :options="formOptions"
                  ref="firstTabForm"
                  >
      </vue-form-generator>
    </tab-content>
    <tab-content title="Additional Info"
                  icon="ti-settings" :before-change="validateSecondTab">
      <vue-form-generator :model="model"
                          :schema="secondTabSchema"
                          :options="formOptions"
                          ref="secondTabForm"
                          >
      </vue-form-generator>
    </tab-content>
    <tab-content title="Last step" icon="ti-check">
      <h4>Your json is ready!</h4>
      <div class="panel-body">
        <pre v-if="model" v-html="prettyJSON(model)"></pre>
      </div>
    </tab-content>
  </form-wizard>
</template>


<script>
import VueFormWizard from "vue-form-wizard";
import VueFormGenerator from "vue-form-generator";

Vue.use(VueFormWizard);
Vue.use(VueFormGenerator);

console.log(VueFormGenerator.validators);

export default {
  name: "Wizard",
  data() {
    return {
      model: {
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        day_birth: "",
        month_birth: "",
        year_birth: "",
        hear_about_us: ""
      },
      formOptions: {
        validationErrorClass: "has-error",
        validationSuccessClass: "has-success",
        validateAfterChanged: true
      },
      firstTabSchema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            label: "Email",
            model: "email",
            required: true,
            validator: VueFormGenerator.validators.email,
            styleClasses: "col-xs-12"
          },
          {
            type: "input",
            inputType: "password",
            label: "Password",
            model: "password",
            min: 6,
            required: true,
            validator: VueFormGenerator.validators.string,
            styleClasses: "col-xs-12"
          },
          {
            type: "input",
            inputType: "password",
            label: "Confirm",
            model: "confirmPassword",
            min: 6,
            required: true,
            validator: VueFormGenerator.validators.string,
            styleClasses: "col-xs-12"
          }
        ]
      },
      secondTabSchema: {
        fields: [
          {
            type: "input",
            inputType: "number",
            label: "DD",
            model: "day_birth",
            required: true,
            min: 1,
            max: 31,
            validator: VueFormGenerator.validators.integer,
            styleClasses: "col-xs-12"
          },
          {
            type: "input",
            inputType: "number",
            label: "MM",
            model: "month_birth",
            required: true,
            min: 1,
            max: 12,
            validator: VueFormGenerator.validators.integer,
            styleClasses: "col-xs-12"
          },
          {
            type: "input",
            inputType: "number",
            label: "YYYY",
            model: "year_birth",
            required: true,
            validator: VueFormGenerator.validators.integer,
            styleClasses: "col-xs-12"
          },
          {
            type: "radios",
            label: "Gender",
            model: "gender",
            required: true,
            validator: VueFormGenerator.validators.string,
            values: ["Male", "Female", "Unspecified"],
            styleClasses: "col-xs-12"
          },
          {
            type: "select",
            label: "Where did you head about us?",
            model: "hear_about_us",
            validator: VueFormGenerator.validators.string,
            values: ["TV", "Radio", "Friends"],
            styleClasses: "col-xs-12"
          }
        ]
      }
    };
  },
  methods: {
    onComplete: function() {
      alert("Yay. Done!");
    },
    validateFirstTab: function() {
      console.log(this.$refs.firstTabForm);
      return this.$refs.firstTabForm.validate();
    },
    validateSecondTab: function() {
      return this.$refs.secondTabForm.validate();
    },

    prettyJSON: function(json) {
      if (json) {
        json = JSON.stringify(json, undefined, 4);
        json = json.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
        return json.replace(
          /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
          function(match) {
            var cls = "number";
            if (/^"/.test(match)) {
              if (/:$/.test(match)) {
                cls = "key";
              } else {
                cls = "string";
              }
            } else if (/true|false/.test(match)) {
              cls = "boolean";
            } else if (/null/.test(match)) {
              cls = "null";
            }
            return '<span class="' + cls + '">' + match + "</span>";
          }
        );
      }
    }
  }
};
</script>
