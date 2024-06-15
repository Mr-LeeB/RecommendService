import { TfIdf } from 'natural';

interface IRecommendService {
  id: string;
  content: string;
}

class RecommendService {
  static formatData = (data) => {
    const formatted = [];

    for (const [key, labels] of Object.entries(data)) {
      let tmpObj = {};
      const desc = labels.map(() => {
        return l.description.toLowerCase();
      });

      tmpObj = {
        id: key,
        content: desc.join(' ')
      };

      formatted.push(tmpObj);
    }

    return formatted;
  };

  static createVectorsFromDocs = (processedDocs) => {
    const tfidf = new TfIdf();

    processedDocs.forEach((processedDocument) => {
      tfidf.addDocument(processedDocument.content);
    });

    const documentVectors = [];

    for (let i = 0; i < processedDocs.length; i += 1) {
      const processedDocument = processedDocs[i];
      const obj = {};

      const items = tfidf.listTerms(i);

      for (let j = 0; j < items.length; j += 1) {
        const item = items[j];
        obj[item.term] = item.tfidf;
      }

      const documentVector = {
        id: processedDocument.id,
        vector: new Vector(obj)
      };

      documentVectors.push(documentVector);
    }
  };

  static calcSimilarities = (docVectors) => {
    // number of results that you want to return.
    const MAX_SIMILAR = 20;
    // min cosine similarity score that should be returned.
    const MIN_SCORE = 0.2;
    const data = {};

    for (let i = 0; i < docVectors.length; i += 1) {
      const documentVector = docVectors[i];
      const { id } = documentVector;

      data[id] = [];
    }

    for (let i = 0; i < docVectors.length; i += 1) {
      for (let j = 0; j < i; j += 1) {
        const idi = docVectors[i].id;
        const vi = docVectors[i].vector;
        const idj = docVectors[j].id;
        const vj = docVectors[j].vector;
        const similarity = vi.getCosineSimilarity(vj);

        if (similarity > MIN_SCORE) {
          data[idi].push({ id: idj, score: similarity });
          data[idj].push({ id: idi, score: similarity });
        }
      }
    }

    // finally sort the similar documents by descending order
    Object.keys(data).forEach((id) => {
      data[id].sort((a, b) => b.score - a.score);

      if (data[id].length > MAX_SIMILAR) {
        data[id] = data[id].slice(0, MAX_SIMILAR);
      }
    });

    return data;
  };

  static getLength = () => {
    let l = 0;

    this.getComponents().forEach((k) => {
      l += this.vector[k] * this.vector[k];
    });

    return Math.sqrt(l);
  };

  static getCosineSimilarity = (vector) => {
    return this.getDotProduct(vector) / (this.getLength() * vector.getLength());
  };

  static getSimilarDocuments = (id, trainedData) => {
    const similarDocuments = trainedData[id];

    if (similarDocuments === undefined) {
      return [];
    }

    return similarDocuments;
  };
}

export default RecommendService;
