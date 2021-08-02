<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">

    <div class="px-4 py-5 sm:p-6">
      <div
        class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="drop"
      >
        <input
          type="file"
          id="assetsFieldHandle"
          class="w-px h-px opacity-0 overflow-hidden absolute"
          @change="loadUploadedFile"
          ref="file"
          accept=".vcard"
        />

        <div class="block cursor-pointer">
          <label for="assetsFieldHandle" class="flex flex-col space-y-4 items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            <div>Dateien hierher ziehen oder <span class="underline">hier</span> klicken</div>
          </label>
        </div>
      </div>

      <div v-if="vcardNeu" class="my-16 flex items-center justify-center">
        <button type="button" @click="downloadVcard" class="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          Download Vcard
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import vCard from "vcard-parser";
import { saveAs } from 'file-saver';

export default {
  name: 'RepairTool',

  data() {
    return {
      vcardNeu: null,
      vcardParsed: null,
      uploadedFile: null,
    }
  },

  methods: {
    loadUploadedFile() {
      this.uploadedFile = this.$refs.file.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        this.vcardParsed = vCard.parse(event.target.result)

        this.vcardParsed.url = this.vcardParsed.url.map((url) => ({
          value: url.value
        }))

        this.vcardNeu = vCard.generate(this.vcardParsed)
      }

      reader.readAsText(this.uploadedFile);
    },

    downloadVcard() {
      const blob = new Blob([this.vcardNeu], {type: "text/vcard"});
      saveAs(blob, this.newFilename);
    },

    dragover(event) {
      event.preventDefault();
      if (!event.currentTarget.classList.contains('bg-green-300')) {
        event.currentTarget.classList.remove('bg-gray-100');
        event.currentTarget.classList.add('bg-green-300');
      }
    },
    dragleave(event) {
      event.currentTarget.classList.add('bg-gray-100');
      event.currentTarget.classList.remove('bg-green-300');
    },
    drop(event) {
      event.preventDefault();
      this.$refs.file.files = event.dataTransfer.files;
      this.loadUploadedFile();
      event.currentTarget.classList.add('bg-gray-100');
      event.currentTarget.classList.remove('bg-green-300');
    }
  },

  computed: {
    newFilename() {
      return this.uploadedFile.name.replace('.vcf', '_repariert.vcf')
    }
  }
}
</script>